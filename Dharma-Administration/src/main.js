import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';


import 'element-plus/lib/theme-chalk/index.css';
import "./assets/css/main.css";

import { directives } from './components/common/directives';
import { router } from "./router/index";


export const app = createApp(App);

app.use(ElementPlus);
app.use(router);

app.directive('dialogDrag', directives);

app.mount("#app");
