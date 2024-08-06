import { createApp } from 'vue';
import App from './App.vue';

import router from './router';
import './assets/styles/style.css';
import './assets/styles/global.less';
import Log from './utils/log';
window.$log = Log;
// 在组件中的使用方式   window.$log.info('DefaultHome');
const app = createApp(App);
app.use(router);
app.mount('#app');
