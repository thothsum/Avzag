module.exports = {
    configureWebpack: {
        devtool: 'source-map'
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? '/Avzag/'
        : '/',
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "@/scss/_variables.scss";`
            }
        }
    },
    pwa: {
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'default',
        manifestOptions: {
            dir: "ltr",
            lang: "English",
            name: "Avzag - sounds & scripts",
            scope: ".",
            display: "standalone",
            start_url: ".",
            short_name: "Avzag",
            theme_color: "#201F1E",
            description: "An attempt to help our languages.",
            orientation: "natural",
            background_color: "#201F1E",
            related_applications: [],
            prefer_related_applications: false,
            icons: [
                {
                    "src": "icon.png",
                    "type": "image/png",
                    "sizes": "512x512"
                }
            ],
            url: ".",
            screenshots: []
        },
        iconPaths:
        {
            favicon32: 'icon.png',
            favicon16: 'icon.png',
            appleTouchIcon: 'icon.png',
            maskIcon: 'icon.png',
            msTileImage: 'icon.png'
        },
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            swSrc: 'src/service-worker.js',
        }
    }
}
