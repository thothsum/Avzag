import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const Home = () => import("src/Home/index.vue");

const Navigation = () => import("src/Navigation.vue");
const EditorNavigation = () => import("src/EditorNavigation.vue");

const Phonology = () => import("src/Phonology/index.vue");
const Converter = () => import("src/Converter/index.vue");
const Phrasebook = () => import("src/Phrasebook/index.vue");
const Dictionary = () => import("src/Dictionary/index.vue");

const PhonologyEditor = () => import("src/Phonology/Editor.vue");
const ConverterEditor = () => import("src/Converter/Editor.vue");
const PhrasebookEditor = () => import("src/Phrasebook/Editor.vue");
const PhrasebookCorpusEditor = () => import("src/Phrasebook/CorpusEditor.vue");
const DictionaryEditor = () => import("src/Dictionary/Editor.vue");

export const userRoutes = [
  {
    path: "phonology",
    name: "phonology",
    icon: "audiotrack",
    component: Phonology,
  },
  {
    path: "converter",
    name: "converter",
    icon: "sync_alt",
    component: Converter,
  },
  {
    path: "phrasebook",
    name: "phrasebook",
    icon: "chat",
    component: Phrasebook,
  },
  {
    path: "dictionary",
    name: "dictionary",
    icon: "book",
    component: Dictionary,
  },
];
export const editorRoutes = [
  {
    path: "phonology",
    title: "Phonology",
    name: "phonologyEditor",
    component: PhonologyEditor,
  },
  {
    path: "converter",
    title: "Converter",
    name: "converterEditor",
    component: ConverterEditor,
  },
  {
    path: "phrasebook",
    title: "Phrasebook",
    name: "phrasebookEditor",
    component: PhrasebookEditor,
  },
  {
    path: "phrasebookСorpus",
    title: "Phrasebook Corpus",
    name: "phrasebookCorpusEditor",
    component: PhrasebookCorpusEditor,
  },
  {
    path: "dictionary",
    title: "Dictionary",
    name: "dictionaryEditor",
    component: DictionaryEditor,
  },
];

const routes = [
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/",
    component: Navigation,
    children: userRoutes,
  },
  {
    path: "/editor/",
    component: EditorNavigation,
    children: editorRoutes,
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
