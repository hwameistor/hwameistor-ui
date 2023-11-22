const svg = require.context('./', true, /[A-Za-z0-9-_,\s]+\.svg$/i);

const svgAssets: Record<string, string> = {};

function getSvgAsset() {
  svg.keys().forEach((key) => {
    let rst = svg(key);

    const meaningfulName = key.slice(2, -4);

    if (rst.default && typeof rst.default === 'object') {
      rst = rst.default;
    }

    svgAssets[meaningfulName] = rst;
  });

  return svgAssets;
}

export default getSvgAsset;
