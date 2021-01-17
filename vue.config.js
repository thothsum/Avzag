module.exports = {
  configureWebpack: {
    devtool: "source-map",
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "@/scss/_variables.scss";',
      },
    },
  },
  pwa: {
    appleMobileWebAppCapable: "yes",
    manifestOptions: {
      dir: "ltr",
      lang: "English",
      name: "Avzag",
      scope: ".",
      display: "standalone",
      description: "An attempt to help our languages.",
      orientation: "natural",
      icons: [
        {
          src: "icon.png",
          type: "image/png",
          sizes: "512x512",
        },
      ],
      url: ".",
      screenshots: [],
    },
    iconPaths: {
      favicon32: "icon.png",
      favicon16: "icon.png",
      appleTouchIcon: "icon.png",
      maskIcon: "icon.png",
      msTileImage: "icon.png",
    },
    name: "Avzag",
    themeColor: "#4A4A4A",
    msTileColor: "#4A4A4A",
  },
};
