import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";
import "./assets/styles/style.css";
import "./assets/styles/global.less";

const app = createApp(App);
app.use(router);
app.mount("#app");
