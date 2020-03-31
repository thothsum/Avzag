module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/Aevzag/'
        : '/',
    pwa: {
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'default',
        manifestOptions: {
            dir: "ltr",
            lang: "English",
            name: "Ævzag - sounds & scripts",
            scope: ".",
            display: "standalone",
            start_url: ".",
            short_name: "Ævzag",
            theme_color: "#4C566A",
            description: "An attempt to help our languages.",
            orientation: "natural",
            background_color: "#FFF",
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
        workboxPluginMode: 'GenerateSW'
    }
}
