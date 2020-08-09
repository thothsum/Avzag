import Vue from 'vue'
import VueRouter from 'vue-router'

import Phonology from '../views/Phonology.vue'
import Converter from '../views/Converter.vue'
import Phrasebook from '../views/Phrasebook.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
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
  },
  {
    path: '/phrasebook/:lang',
    name: 'Phrasebook',
    component: Phrasebook
  },
  {
    path: '*',
    redirect: { name: 'Home' }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
