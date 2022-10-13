include Makefile.variables

# hwameistor-ui-server build definitions
UIServer_MODULE_NAME = hwameistor-ui-server
UIServer_BUILD_INPUT = ${CMDS_DIR}/${UIServer_MODULE_NAME}/ui-server.go

.PHONY: debug
debug:
	${DOCKER_DEBUG_CMD} ash

.PHONY: compile
compile: compile_uiserver

.PHONY: image
image: build_uiserver_image

.PHONY: release
release:release_uiserver

.PHONY: unit-test
unit-test:
	go test -race -coverprofile=coverage.txt -covermode=atomic ./pkg/...
	curl -s https://codecov.io/bash | bash

.PHONY: vendor
vendor:
	go mod tidy -compat=1.17
	go mod vendor

.PHONY: release_uiserver
release_uiserver:
	# build for amd64 version
	${DOCKER_MAKE_CMD} make compile_uiserver
	${DOCKER_BUILDX_CMD_AMD64} -t ${UIServer_IMAGE_NAME}:${RELEASE_TAG}-amd64 -f ${UIServer_IMAGE_DOCKERFILE} ${PROJECT_SOURCE_CODE_DIR}
	# build for arm64 version
	${DOCKER_MAKE_CMD} make compile_uiserver_arm64
	${DOCKER_BUILDX_CMD_ARM64} -t ${UIServer_IMAGE_NAME}:${RELEASE_TAG}-arm64 -f ${UIServer_IMAGE_DOCKERFILE} ${PROJECT_SOURCE_CODE_DIR}
	# push to a public registry
	${MUILT_ARCH_PUSH_CMD} ${UIServer_IMAGE_NAME}:${RELEASE_TAG}

.PHONY: build_uiserver_image
build_uiserver_image:
	@echo "Build local-storage image ${UIServer_IMAGE_NAME}:${IMAGE_TAG}"
	${DOCKER_MAKE_CMD} make compile_uiserver
	docker build -t ${UIServer_IMAGE_NAME}:${IMAGE_TAG} -f ${UIServer_IMAGE_DOCKERFILE} ${PROJECT_SOURCE_CODE_DIR}

.PHONY: apis
apis:
	${DOCKER_MAKE_CMD} make _gen-apis

.PHONY: builder
builder:
	docker build -t ${BUILDER_NAME}:${BUILDER_TAG} -f ${BUILDER_DOCKERFILE} ${PROJECT_SOURCE_CODE_DIR}
	docker push ${BUILDER_NAME}:${BUILDER_TAG}

.PHONY: compile_uiserver
compile_uiserver:
	GOARCH=amd64 ${BUILD_ENVS} ${BUILD_CMD} ${BUILD_OPTIONS} -o ${UIServer_BUILD_OUTPUT} ${UIServer_BUILD_INPUT}

.PHONY: compile_uiserver_arm64
compile_uiserver_arm64:
	GOARCH=arm64 ${BUILD_ENVS} ${BUILD_CMD} ${BUILD_OPTIONS} -o ${UIServer_BUILD_OUTPUT} ${UIServer_BUILD_INPUT}

.PHONY: _enable_buildx
_enable_buildx:
	@echo "Checking if buildx enabled"
	@if [[ "$(shell docker version -f '{{.Server.Experimental}}')" == "true" ]]; \
	then \
		docker buildx inspect mutil-platform-builder &>/dev/null; \
	        [ $$? == 0 ] && echo "ok" && exit 0; \
		docker buildx create --name mutil-platform-builder &>/dev/null&& echo "ok" && exit 0; \
	else \
		echo "experimental config of docker is false"; \
		exit 1; \
	fi


.PHONY: e2e-test
e2e-test:
	bash test/e2e-test.sh
