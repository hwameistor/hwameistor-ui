#!/usr/bin/env bash
set -euo pipefail

image=${1:?Usage: smoke-image.sh IMAGE PLATFORM}
platform=${2:?Usage: smoke-image.sh IMAGE PLATFORM}
workdir=$(mktemp -d -t mmzhou-ui-nginx-smoke.XXXXXXXX)
run_name=${workdir##*/}
network="${run_name}-network"
upstream="${run_name}-upstream"
ui="${run_name}-ui"

cleanup() {
  status=$?
  trap - EXIT
  if [ "$status" -ne 0 ]; then
    docker logs "$ui" || true
    docker logs "$upstream" || true
  fi
  docker rm --force "$ui" "$upstream" >/dev/null 2>&1 || true
  docker network rm "$network" >/dev/null 2>&1 || true
  rm -rf "$workdir"
  exit "$status"
}
trap cleanup EXIT

test -s dist/index.html
docker network create "$network" >/dev/null

# The real configuration resolves hwameistor-apiserver at startup.
cat > "$workdir/upstream.conf" <<'NGINX'
pid /tmp/nginx.pid;
error_log /dev/stderr notice;
events {}
http {
    access_log /dev/stdout;
    server {
        listen 80;
        location / {
            default_type text/plain;
            return 200 "mock-upstream:$request_uri";
        }
    }
}
NGINX

docker run --detach --platform "$platform" --name "$upstream" \
  --network "$network" --network-alias hwameistor-apiserver \
  --user 0 --entrypoint nginx \
  --mount "type=bind,src=${workdir}/upstream.conf,dst=/tmp/upstream.conf,readonly" \
  "$image" -c /tmp/upstream.conf -g 'daemon off;' >/dev/null

# Use the shipped entrypoint, command, user and nginx.conf for the UI.
docker run --detach --platform "$platform" --name "$ui" \
  --network "$network" --publish 127.0.0.1::8080 "$image" >/dev/null
port=$(docker port "$ui" 8080/tcp | sed 's/.*://')
base_url="http://127.0.0.1:${port}"

ready=false
for attempt in $(seq 1 30); do
  if curl --fail --silent --show-error --max-time 2 "$base_url/ping" \
      > "$workdir/ping" 2>/dev/null; then
    ready=true
    break
  fi
  sleep 1
done
test "$ready" = true
test "$(cat "$workdir/ping")" = pong

version=$(docker exec "$ui" nginx -v 2>&1)
printf '%s\n' "$version"
test "$version" = 'nginx version: nginx/1.30.7'
test "$(docker exec "$ui" id -u)" -ne 0
docker exec "$ui" nginx -t

curl --fail --silent --show-error --max-time 10 "$base_url/" > "$workdir/index.html"
cmp dist/index.html "$workdir/index.html"
curl --fail --silent --show-error --max-time 10 "$base_url/nginx-smoke/deep-link" \
  > "$workdir/deep-link.html"
cmp dist/index.html "$workdir/deep-link.html"

response=$(curl --fail --silent --show-error --max-time 10 \
  "$base_url/apis/nginx-smoke?check=1")
test "$response" = 'mock-upstream:/apis/nginx-smoke?check=1'
printf 'Container smoke test passed for %s\n' "$platform"
