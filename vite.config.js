import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  server: {
    port: 8080,
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
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
