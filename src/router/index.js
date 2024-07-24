// 引入Vue和VueRouter
// 路由器实例：createRouter
import { createRouter, createWebHistory } from "vue-router";

// 定义路由：把每个路由URL路径映射到组件。我们使用'path'来定义URL路径，'component'来定义对应的组件
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
    children: [
      {
        path: "",
        name: "About1",
        component: () => import("@/views/About1.vue"),
      },
      {
        path: "about2",
        name: "About2",
        component: () => import("@/views/About2.vue"),
      },
    ],
  },
  {
    path: "/store",
    name: "Store",
    // component: () => import("@/views/Store.vue"),
    components: {
      default: () => import("@/views/Store.vue"),
      // helper: helper 的缩写它们与 `<router-view>` 上的 `name` 属性匹配
      helper: () => import("@/views/Helper.vue"),
    },
  },
  {
    path: "/users",
    name: "User",
    component: () => import("@/views/User.vue"),
  },
  {
    // /:id(\\d+) -> 仅匹配数字
    // *（0 个或多个）和 +（1 个或多个）
    // /:chapters+ ->  匹配 /one, /one/two, /one/two/three, 等
    // /:chapters* -> 匹配 /, /one, /one/two, /one/two/three, 等
    path: "/users/detail/:id",
    name: "Detail",
    component: () => import("@/views/Detail.vue"),
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
