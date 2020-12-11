import { createRouter } from 'vue-router'

import PhonologyEditor from '../views/PhonologyEditor.vue'
import ConverterEditor from '../views/ConverterEditor.vue'
import PhrasebookEditor from '../views/PhrasebookEditor.vue'
import PhrasebookCorpusEditor from '../views/PhrasebookCorpusEditor.vue'

import Phonology from '../views/Phonology.vue'
import Converter from '../views/Converter.vue'
import Phrasebook from '../views/Phrasebook.vue'

import Home from '../views/Home.vue'

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
    path: '/editor/converter/',
    name: 'ConverterEditor',
    component: ConverterEditor
  },
  {
    path: '/editor/phrasebook/',
    name: 'PhrasebookEditor',
    component: PhrasebookEditor
  },
  {
    path: '/editor/phrasebook/corpus/',
    name: 'PhrasebookCorpusEditor',
    component: PhrasebookCorpusEditor
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
    path: '/:pathMatch(.*)',
    redirect: {
      name: 'Home'
    }
  },
]

export const router = createRouter({ history: createWebHashHistory(), routes })
