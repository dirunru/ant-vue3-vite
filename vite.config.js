import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { resolve } from "path";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import postcsspxtoviewport from "postcss-px-to-viewport-8-with-include";

export default defineConfig({
  resolve: {
    alias: {
      "@/": resolve(__dirname, "src") + "/",
      components: "src/components", // 为components目录设置别名
    },
  },
  server: {
    host: "localhost",
    port: 5757,
    open: true,
    https: false,
    proxy: {
      "/api": {
        target: "http://example.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    cssCodeSplit: true,
    sourcemap: false,
  },
  plugins: [
    vue(),
    AutoImport({
      // 你可以在这里指定要自动导入的库
      imports: ["vue", "vue-router", "pinia"],
    }),
    // 组件按需引入
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: "less",
        }),
      ],
    }),
  ],
});
