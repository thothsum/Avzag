import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const Home = () => import("@/Home/index.vue");

const Navigation = () => import("@/Navigation.vue");
const EditorNavigation = () => import("@/EditorNavigation.vue");

const Phonology = () => import("@/Phonology/index.vue");
const Converter = () => import("@/Converter/index.vue");
const Phrasebook = () => import("@/Phrasebook/index.vue");
const Dictionary = () => import("@/Dictionary/index.vue");

const PhonologyEditor = () => import("@/Phonology/Editor.vue");
const ConverterEditor = () => import("@/Converter/Editor.vue");
const PhrasebookEditor = () => import("@/Phrasebook/Editor.vue");
const PhrasebookCorpusEditor = () => import("@/Phrasebook/CorpusEditor.vue");

const routes = [
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/",
    component: Navigation,
    children: [
      {
        path: "phonology",
        name: "phonology",
        component: Phonology,
      },
      {
        path: "converter",
        name: "converter",
        component: Converter,
      },
      {
        path: "phrasebook",
        name: "phrasebook",
        component: Phrasebook,
      },
      {
        path: "dictionary",
        name: "dictionary",
        component: Dictionary,
      },
    ],
  },
  {
    path: "/editor/",
    component: EditorNavigation,
    children: [
      {
        path: "phonology",
        name: "phonologyEditor",
        component: PhonologyEditor,
      },
      {
        path: "converter",
        name: "converterEditor",
        component: ConverterEditor,
      },
      {
        path: "phrasebook",
        name: "phrasebookEditor",
        component: PhrasebookEditor,
      },
      {
        path: "phrasebook/corpus",
        name: "phrasebookCorpusEditor",
        component: PhrasebookCorpusEditor,
      },
    ],
  },
  {
    path: "/:pathMatch(.*)",
    redirect: {
      name: "home",
    },
  },
] as RouteRecordRaw[];

export default createRouter({
  history: createWebHistory(),
  routes,
});
