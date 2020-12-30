import { createRouter, createWebHashHistory } from "vue-router";

import PhonologyEditor from "../views/PhonologyEditor.vue";
import ConverterEditor from "../views/ConverterEditor.vue";
import PhrasebookEditor from "../views/PhrasebookEditor.vue";
import PhrasebookCorpusEditor from "../views/PhrasebookCorpusEditor.vue";

import Phonology from "../views/Phonology.vue";
import Converter from "../views/Converter.vue";
import Phrasebook from "../views/Phrasebook.vue";

import NavHeader from "../components/NavHeader.vue";
import Home from "../views/Home.vue";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/phonology/",
      name: "Phonology",
      components: { default: Phonology, NavHeader },
    },
    {
      path: "/converter/",
      name: "Converter",
      components: { default: Converter, NavHeader },
    },
    {
      path: "/phrasebook/",
      name: "Phrasebook",
      components: { default: Phrasebook, NavHeader },
    },
    {
      path: "/editor/phonology/",
      name: "PhonologyEditor",
      component: PhonologyEditor,
    },
    {
      path: "/editor/converter/",
      name: "ConverterEditor",
      component: ConverterEditor,
    },
    {
      path: "/editor/phrasebook/",
      name: "PhrasebookEditor",
      component: PhrasebookEditor,
    },
    {
      path: "/editor/phrasebook/corpus/",
      name: "PhrasebookCorpusEditor",
      component: PhrasebookCorpusEditor,
    },
    {
      path: "/:pathMatch(.*)",
      redirect: {
        name: "Home",
      },
    },
  ],
});
