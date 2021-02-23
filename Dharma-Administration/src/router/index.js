import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/common/Home.vue";
import Dashboard from "../page/dashboard.vue";


const routes = [
    { path: "/", redirect: "/home" },
    { 
        path: "/home", 
        name: "home", 
        component: Home,
        meta: { title: '首页' },
        children: [
            { path: "/dashboard", name: "dashboard", component: Dashboard, meta: { title: '系统首页' } },
        ],  
    }
];
export const router = createRouter({
    history: createWebHistory(),
    routes
});

