import Vue from 'vue'
import VueRouter from 'vue-router'

import Phonology from '../views/Phonology.vue'
import Converter from '../views/Converter.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {
      name: "Converter",
      params: {
        lang: "Dargin"
      }
    }
  },
  {
    path: '/phonology/:lang',
    name: 'Phonology',
    component: Phonology
  },
  {
    path: '/converter/:lang',
    name: 'Converter',
    component: Converter
    // component: () => import('../views/Converter.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
