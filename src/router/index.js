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
    meta: { transition: "slide-right" },
    component: () => import("@/views/User.vue"),
    beforeEnter: (to, from) => {
      console.log("路由独享守卫：只在进入路由时触发");
      // return false;
    },
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
  scrollBehavior(to, from, savedPosition) {
    // return {
    //   el: "#main", // el: document.getElementById('main'),
    //   top: 10, // 在元素上 10 像素
    // };
    // return 期望滚动到哪个的位置
    return { top: 0 }; // 始终滚动到顶部
  },
});
// 全局前置守卫：router.beforeEach
// 全局后置钩子: router.afterEach
// 路由独享的守卫: beforeEnter
// 组件内的守卫：beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave
// 组件内：不能直接访问this:因为守卫在导航确认前被调用，因此即将登场的新组件还没被创建。
// 可以通过传一个回调给 next 来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数：(beforeRouteEnter 是支持给 next 传递回调的唯一守卫)
// 对于 beforeRouteUpdate 和 beforeRouteLeave 来说，this 已经可用了，所以不支持 传递回调
// beforeRouteEnter (to, from, next) {
//   next(vm => { }) // 通过 `vm` 访问组件实例
// }
// 确保 next 在任何给定的导航守卫中都被严格调用一次。它可以出现多于一次，但是只能在所有的逻辑路径都不重叠的情况下，否则钩子永远都不会被解析或报错。
// router.beforeEach((to, from) => {
//   return false; // 返回 false 以取消导航
// });
// 解析守卫刚好会在导航被确认之前、所有组件内守卫和异步路由组件被解析之后调用,是获取数据或执行任何其他操作（如果用户无法进入页面时你希望避免执行的操作）的理想位置。
// router.beforeResolve((to, from) => {
//   console.log("to1", to);
//   return false;
// });
// 导出router，以便在main.js中使用它
export default router;
