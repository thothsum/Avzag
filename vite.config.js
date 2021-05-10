import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import ViteComponents from "vite-plugin-components";

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/scss/_variables";',
      },
    },
  },
  plugins: [Vue(), ViteComponents()],
});
