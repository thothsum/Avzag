import { createRouter, createWebHashHistory } from "vue-router";

import PhonologyEditor from "../views/PhonologyEditor";
import ConverterEditor from "../views/ConverterEditor";
import PhrasebookEditor from "../views/PhrasebookEditor";
import PhrasebookCorpusEditor from "../views/PhrasebookCorpusEditor";

import Phonology from "../views/Phonology";
import Converter from "../views/Converter";
import Phrasebook from "../views/Phrasebook";

import NavHeader from "../components/NavHeader";
import EditorNavHeader from "../components/EditorNavHeader";
import Home from "../views/Home";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/phonology",
      name: "Phonology",
      components: { default: Phonology, NavHeader },
    },
    {
      path: "/converter",
      name: "Converter",
      components: { default: Converter, NavHeader },
    },
    {
      path: "/phrasebook",
      name: "Phrasebook",
      components: { default: Phrasebook, NavHeader },
    },
    {
      path: "/editor",
      components: { NavHeader: EditorNavHeader },
      children: [
        {
          path: "phonology",
          name: "PhonologyEditor",
          component: PhonologyEditor,
        },
        {
          path: "converter",
          name: "ConverterEditor",
          component: ConverterEditor,
        },
        {
          path: "phrasebook",
          name: "PhrasebookEditor",
          component: PhrasebookEditor,
        },
        {
          path: "phrasebook/corpus",
          name: "PhrasebookCorpusEditor",
          component: PhrasebookCorpusEditor,
        },
      ],
    },
    {
      path: "/:pathMatch(.*)",
      redirect: {
        name: "Home",
      },
    },
  ],
});
