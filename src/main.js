import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import router from './router';

import './assets/styles/style.css';
import './assets/styles/global.less';
import Log from './utils/log';
window.$log = Log;
// 在组件中的使用方式   window.$log.info('DefaultHome');

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

app.use(pinia);
app.use(router);
app.mount('#app');
