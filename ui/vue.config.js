const { defineConfig } = require('@vue/cli-service');
const daoStyleUnpluginExtend = require('@dao-style/unplugin-extend/webpack');

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
      daoStyleUnpluginExtend({}),
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
