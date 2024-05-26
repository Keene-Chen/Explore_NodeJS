import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';

// 定义路由
const routes = [
  { path: '/', component: () => import('@/components/Home.vue') },
  { path: '/about', component: () => import('@/components/About.vue') },
  { path: '/upload', component: () => import('@/components/Upload.vue') },
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount('#app');
