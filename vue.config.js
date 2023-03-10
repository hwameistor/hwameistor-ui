const { defineConfig } = require('@vue/cli-service');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const daoStyleUnpluginExtend = require('@dao-style/unplugin-extend/webpack');
const groupMapping = require('@dao-style/extend/dist/group-mapping.json');

module.exports = defineConfig({
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        // eslint-disable-next-line no-param-reassign
        args[0].title = 'HwameiStor';

        return args;
      });
  },
  transpileDependencies: true,

  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin({
        languages: ['yaml'],
        customLanguages: [
          {
            label: 'yaml',
            entry: 'monaco-yaml',
            worker: {
              id: 'monaco-yaml/yamlWorker',
              entry: 'monaco-yaml/yaml.worker',
            },
          },
        ],
      }),
      daoStyleUnpluginExtend({
        mapping: groupMapping,
      }),
    ],
  },

  pluginOptions: {
    i18n: {
      locale: 'en-US',
      fallbackLocale: 'en-US',
      localeDir: 'locales',
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: false,
    },
  },

  devServer: {
    proxy: {
      '^/apis': {
        target: process.env.VUE_APP_API_URL,
      },
    },
  },
});
