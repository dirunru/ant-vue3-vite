import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";
import "./assets/styles/style.css";
import "./assets/styles/global.less";


import { createPinia } from 'pinia'  
const pinia = createPinia()  
// const app = createApp(App);
// app.use(router);
// app.mount("#app");
// 链式调用
createApp(App).use(router).use(pinia).mount("#app");

// app.use(router)做了什么?
// 1、全局注册 RouterView 和 RouterLink 组件。
// 2、添加全局 $router 和 $route 属性。
// 3、启用 useRouter() 和 useRoute() 组合式函数。
// 4、触发路由器解析初始路由。
