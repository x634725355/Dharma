import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/common/Home.vue";

const dashboard = { template: '<div>dashboard</div>' }

const routes = [
    { path: "/", redirect: "/home" },
    { 
        path: "/home", 
        name: "home", 
        component: Home,
        meta: { title: '首页' },
        children: [
            { path: "/dashboard", name: "dashboard", component: dashboard, meta: { title: '系统首页' } },
        ],  
    }
];
export const router = createRouter({
    history: createWebHistory(),
    routes
});

