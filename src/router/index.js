import { createRouter, createWebHashHistory } from "vue-router";

const PhonologyEditor = () => import("../views/Phonology/Editor");
const ConverterEditor = () => import("../views/ConverterEditor");
const PhrasebookEditor = () => import("../views/PhrasebookEditor");
const PhrasebookCorpusEditor = () => import("../views/PhrasebookCorpusEditor");

const Phonology = () => import("../views/Phonology");
const Converter = () => import("../views/Converter");
const Phrasebook = () => import("../views/Phrasebook");

const NavHeader = () => import("../components/NavHeader");
const EditorNavHeader = () => import("../components/EditorNavHeader");
const Home = () => import("../views/Home");

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
