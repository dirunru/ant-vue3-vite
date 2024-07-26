import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { resolve } from "path";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  resolve: {
    alias: {
      "@/": resolve(__dirname, "src") + "/",
      "@assets/": resolve(__dirname, "assets") + "/",
      "@utils/": resolve(__dirname, "utils") + "/",
      "@components/": resolve(__dirname, "components") + "/",
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
  // build: {
  //   outDir: "dist",
  //   assetsDir: "assets",
  //   cssCodeSplit: true,
  //   sourcemap: false,
  // },
  build: {
    target: "es2022", // 或更高版本，根据你的需求选择
    minify: false,
    // 进行压缩计算
    brotliSize: false,
    //指定输出路径
    assetsDir: "./",
    // 指定输出文件路径
    outDir: "dist",
    // 代码压缩配置
    terserOptions: {
      // 生产环境移除console
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // chunkSizeWarningLimit: 1500,大文件报警阈值设置,不建议使用
    rollupOptions: {
      output: {
        //静态资源分类打包
        chunkFileNames: "static/js/[name]-[hash].js",
        entryFileNames: "static/js/[name]-[hash].js",
        // assetFileNames: "static/[ext]/[name]-[hash].[ext]",
        assetFileNames(assetInfo) {
          // 判断后缀分别放到不用的文件夹中
          if (assetInfo.name.endsWith(".css")) {
            return "static/css/[name]-[hash].[ext]";
          }
          if (
            ["png", "jpg", "svg", "PNG"].some((ext) =>
              assetInfo.name.endsWith(ext)
            )
          ) {
            return "static/img/[name]-[hash].[ext]";
          }
          if (
            ["ttf", "woff", "woff2"].some((ext) => assetInfo.name.endsWith(ext))
          ) {
            return "static/fonts/[name]-[hash].[ext]";
          }
          return "static/css/[name]-[hash].[ext]";
        },
        manualChunks(id) {
          //静态资源分拆打包
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
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
