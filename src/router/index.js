import Vue from 'vue'
import VueRouter from 'vue-router'

import PhonologyEditor from '../views/PhonologyEditor.vue'

import Phonology from '../views/Phonology.vue'
import Converter from '../views/Converter.vue'
import Phrasebook from '../views/Phrasebook.vue'

import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/editor/phonology/',
    name: 'PhonologyEditor',
    component: PhonologyEditor
  },
  {
    path: '/phonology/',
    name: 'Phonology',
    component: Phonology
  },
  {
    path: '/converter/',
    name: 'Converter',
    component: Converter
  },
  {
    path: '/phrasebook/',
    name: 'Phrasebook',
    component: Phrasebook
  },
  {
    path: '*',
    redirect: {
      name: 'Home'
    }
  },
]

const router = new VueRouter({
  routes
})

export default router
