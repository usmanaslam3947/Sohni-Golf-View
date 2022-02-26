import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/apartment',
    name: 'Apartment',
    component: () => import(/* webpackChunkName: "about" */ '../views/Apartment.vue')
  },
  {
    path: '/payment',
    name: 'Payment',
    component: () => import(/* webpackChunkName: "about" */ '../views/Payment.vue')
  },
  {
    path: '/bill',
    name: 'Bill',
    component: () => import(/* webpackChunkName: "about" */ '../views/Bill.vue')
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router