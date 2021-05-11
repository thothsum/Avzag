import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import ViteComponents from "vite-plugin-components";
import { VitePWA } from "vite-plugin-pwa";
import { resolve } from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/scss/_variables";',
      },
    },
  },
  plugins: [
    vue(),
    ViteComponents({ deep: true }),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Avzag",
        themeColor: "#4A4A4A",
        icons: [
          {
            src: "icon.png",
            type: "image/png",
            sizes: "512x512",
          },
        ],
      },
    }),
  ],
});
