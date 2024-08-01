// 引入Vue和VueRouter
import { createRouter, createWebHistory } from "vue-router";
// 动态导入组件并返回其 meta
async function getComponentMeta(path) {
  const module = await import(path);
  if (module.meta) {
    return module.meta;
  }
  return null;
}
// 获取文件夹下的文件列表，然后拼成路由对象
const routeFun = async (parentNames) => {
  const toComponents = async (modules, parentName) => {
    let routes = [];
    for (const path of Object.keys(modules)) {
      // path 是类似 "/src/views/Home/HomePage.vue" 的字符串
      // 我们需要从中提取出组件名或路由名
      // prettier-ignore
      const componentName = path.split("/").pop().replace(/\.\w+$/, "");
      // console.log("componentName", componentName);
      if (componentName !== "index") {
        const meta = await getComponentMeta(path);
        // prettier-ignore
        routes.push({
          path: componentName === "DefaultHome" ? "" : `${componentName.toLowerCase()}`,
          name: `${componentName === "DefaultHome" ? parentName : ''}${componentName}`,
          meta: {
            title: meta?.title,
            show: true,
          },
          component: () => import(`@/views/${parentName}/${componentName}.vue`),
        });
      }
    }
    return routes;
  };
  let routeArray = [];
  const promises = [];
  for (const item of parentNames) {
    let promise;
    if (item === "Home") {
      promise = toComponents(import.meta.glob("../views/Home/*.vue"), item);
    } else if (item === "Layout") {
      promise = toComponents(import.meta.glob("../views/Layout/*.vue"), item);
    }
    if (promise) {
      promises.push(promise.then((arr) => routeArray.push(...arr)));
    }
  }
  await Promise.all(promises); // 等待所有异步操作完成
  return routeArray;
};

let homeChildrenCom = await routeFun(["Home"]);
// console.log("homeChildrenCom", homeChildrenCom);
let layoutChildrenCom = await routeFun(["Layout"]);
// 定义路由
// 每个路由应该映射一个组件。这里，我们使用'path'来定义URL路径，'component'来定义对应的组件
const routes = [
  {
    path: "/home",
    name: "Home",
    alias: "/",
    component: () => import("@/views/Home/index.vue"),
    children: [...homeChildrenCom],
  },
  {
    path: "/login",
    name: "Login",
    meta: { title: "登录" },
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/layout",
    name: "Layout",
    component: () => import("@/views/Layout/index.vue"),
    children: [...layoutChildrenCom],
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
router.beforeEach((to, from, next) => {
  //asyncRoutesMark:是否加载了路由信息，为false则要请求路由接口
  //isLogin:登录状态
  let isLoadRouters = false;
  let isLogin = false;
  const token = localStorage.getItem("token");
  if (token && isLogin) {
    if (isLoadRouters) {
      //登录成功后不能通过历史箭头返回登录页面
      if (to.path !== "/login") {
        next();
      } else {
        //如果刚好url变成/login,重置from的path
        next({ ...from, replace: true });
      }
    } else {
      next({ ...to, replace: true });
    }
  } else {
    if (to.path === "/login" || to.path === "/register") {
      next();
    } else {
      next("/login");
    }
  }
});
// 导出router，以便在main.js中使用它
export default router;
