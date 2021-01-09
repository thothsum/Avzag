import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const Home = () => import("@/views/Home/index.vue");

const NavHeader = () => import("@/components/NavHeader.vue");
const EditorNavHeader = () => import("@/components/EditorNavHeader.vue");

const Phonology = () => import("@/views/Phonology/index.vue");
const Converter = () => import("@/views/Converter/index.vue");
const Phrasebook = () => import("@/views/Phrasebook/index.vue");

const PhonologyEditor = () => import("@/views/Phonology/Editor.vue");
const ConverterEditor = () => import("@/views/Converter/Editor.vue");
const PhrasebookEditor = () => import("@/views/Phrasebook/Editor.vue");
const PhrasebookCorpusEditor = () =>
  import("@/views/Phrasebook/CorpusEditor.vue");

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/",
    component: NavHeader,
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
    component: EditorNavHeader,
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
  history: createWebHashHistory(),
  routes,
});
