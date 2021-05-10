import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import viteComponents from "vite-plugin-components";
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
  plugins: [vue(), viteComponents()],
});
