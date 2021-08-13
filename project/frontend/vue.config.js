module.exports = {
  transpileDependencies: ["vuetify"],
  productionSourceMap: true,
  lintOnSave: false,

  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/assets/scss/style.scss";`,
      },
    },
  },

  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: false,
    },
  },
};
