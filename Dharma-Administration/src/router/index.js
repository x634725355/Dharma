import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/common/Home.vue";
import dashboard from "../page/dashboard.vue";
import momoHome from "../page/momoHome.vue";


const routes = [
    { path: "/", redirect: "/home" },
    { 
        path: "/home", 
        name: "home", 
        component: Home,
        meta: { title: '首页' },
        children: [
            { path: "/dashboard", name: "dashboard", component: dashboard, meta: { title: '系统首页' } },
            { path: "/momoHome", name: "momoHome", component: momoHome, meta: { title: 'momo首页' } },
        ],  
    }
];
export const router = createRouter({
    history: createWebHistory(),
    routes
});

