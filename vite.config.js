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
  build: {
    cssCodeSplit: false,
  },
  optimizeDeps: {
    include: ["vue", "vue-router"],
  },
  plugins: [vue()],
});