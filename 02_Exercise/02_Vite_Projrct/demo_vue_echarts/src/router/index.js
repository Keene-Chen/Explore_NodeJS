import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/chart',
      name: 'chart',
      component: () => import('@/views/chart/EchartsView.vue'),
      children: [
        {
          path: 'bar',
          name: 'bar',
          component: () => import('@/views/chart/BarView.vue')
        },
        {
          path: 'line',
          name: 'line',
          component: () => import('@/views/chart/LineView.vue')
        },
        {
          path: 'pie',
          name: 'pie',
          component: () => import('@/views/chart/PieView.vue')
        }
      ]
    }
  ]
})

export default router
