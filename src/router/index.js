import Vue from 'vue'
import VueRouter from 'vue-router'

import Phonology from '../views/Phonology.vue'
import Converter from '../views/Converter.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: ':lang/phonology/',
    name: 'Phonology',
    component: Phonology
  },
  {
    path: ':lang/converter/',
    name: 'Converter',
    component: Converter
  },
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
