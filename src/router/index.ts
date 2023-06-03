import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/blogs/:id',
      name: 'blog-view',
      component: () => import('../views/Blogs/ViewBlog.vue')
    },
    {
      path: '/add/blog',
      name: 'blog-add',
      component: () => import('../views/Blogs/AddBlog.vue')
    }
  ]
})

export default router
