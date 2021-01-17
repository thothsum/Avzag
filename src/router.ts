import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const Home = () => import("@/Home/index.vue");

const Navigation = () => import("@/Navigation.vue");
const EditorNavigation = () => import("@/EditorNavigation.vue");

const Phonology = () => import("@/Phonology/index.vue");
const Converter = () => import("@/Converter/index.vue");
const Phrasebook = () => import("@/Phrasebook/index.vue");

const PhonologyEditor = () => import("@/Phonology/Editor.vue");
const ConverterEditor = () => import("@/Converter/Editor.vue");
const PhrasebookEditor = () => import("@/Phrasebook/Editor.vue");
const PhrasebookCorpusEditor = () => import("@/Phrasebook/CorpusEditor.vue");

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/",
    component: Navigation,
    children: [
      {
        path: "/phonology",
        name: "Phonology",
        component: Phonology,
      },
      {
        path: "/converter",
        name: "Converter",
        component: Converter,
      },
      {
        path: "/phrasebook",
        name: "Phrasebook",
        component: Phrasebook,
      },
    ],
  },
  {
    path: "/editor",
    component: EditorNavigation,
    children: [
      {
        path: "/editor/phonology",
        name: "PhonologyEditor",
        component: PhonologyEditor,
      },
      {
        path: "/editor/converter",
        name: "ConverterEditor",
        component: ConverterEditor,
      },
      {
        path: "/editor/phrasebook",
        name: "PhrasebookEditor",
        component: PhrasebookEditor,
      },
      {
        path: "/editor/phrasebook/corpus",
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
] as RouteRecordRaw[];

export default createRouter({
  history: createWebHistory(),
  routes,
});
