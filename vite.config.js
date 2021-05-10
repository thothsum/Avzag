import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  resolve: {
    alias: [
      {
        find: "@",
        replacement: "/src/",
      },
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/scss/_variables";',
      },
    },
  },
  build: {
    cssCodeSplit: false,
  },
  optimizeDeps: {
    include: ["vue", "vue-router"],
  },
  plugins: [vue()],
});
