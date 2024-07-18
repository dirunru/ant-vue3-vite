// 引入Vue和VueRouter
import { createRouter, createWebHistory } from "vue-router";

// 定义路由
// 每个路由应该映射一个组件。这里，我们使用'path'来定义URL路径，'component'来定义对应的组件
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/About.vue"),
  },
  {
    path: "/echart",
    name: "Echart",
    component: () => import("@/views/Echart.vue"),
  },
  {
    path: "/:path(.*)*",
    component: () => import("@/views/exception/404/index.vue"),
  },
  // 你可以继续定义其他路由...
];

// 创建router实例，然后传`routes`配置和`history`模式
const router = createRouter({
  history: createWebHistory(), // 使用HTML5 History模式
  routes, // （缩写）相当于 routes: routes
});

// 导出router，以便在main.js中使用它
export default router;
