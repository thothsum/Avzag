import { createRouter, createWebHashHistory } from "vue-router";

import PhonologyEditor from "../views/Phonology/Editor";
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
      path: "/editor/phonology",
      name: "PhonologyEditor",
      components: { default: PhonologyEditor, NavHeader: EditorNavHeader },
    },
    {
      path: "/editor/converter",
      name: "ConverterEditor",
      components: { default: ConverterEditor, NavHeader: EditorNavHeader },
    },
    {
      path: "/editor/phrasebook",
      name: "PhrasebookEditor",
      components: { default: PhrasebookEditor, NavHeader: EditorNavHeader },
    },
    {
      path: "/editor/phrasebook/corpus",
      name: "PhrasebookCorpusEditor",
      components: {
        default: PhrasebookCorpusEditor,
        NavHeader: EditorNavHeader,
      },
    },
    {
      path: "/:pathMatch(.*)",
      redirect: {
        name: "Home",
      },
    },
  ],
});
