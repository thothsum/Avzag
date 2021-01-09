<template>
  <div id="root" v-bind="attrs" class="small">
    <div class="section scroll row-1">
      <div class="row-1">
        <router-link v-slot="{ navigate }" custom :to="{ name: 'Home' }">
          <control icon="arrow_back" @click="navigate" />
        </router-link>
        <Select v-model="menu" :items="menus" label-key="text" />
      </div>
      <div class="row-1 controls">
        <control icon="save" />
        <p class="text-dot" />
        <control icon="language" @click="loadLect" />
        <control icon="code" @click="loadJSON" />
        <control icon="integration_instructions" @click="saveJSON" />
        <p class="text-dot" />
        <ButtonAlert @confirm="reset" />
      </div>
    </div>
  </div>
  <router-view />
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import ButtonAlert from "./ButtonAlert";
import Select from "./Select";
import { ref, useContext, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { config } from "@/editorManager";

const attrs = useContext().attrs;
const route = useRoute();
const router = useRouter();
const store = useStore();

const menus = [
  {
    icon: "audiotrack",
    text: "Phonology",
    name: "PhonologyEditor",
  },
  {
    icon: "sync_alt",
    text: "Converter",
    name: "ConverterEditor",
  },
  {
    icon: "book",
    text: "Phrasebook",
    name: "PhrasebookEditor",
  },
  {
    icon: "bookmark",
    text: "Phrasebook Corpus",
    name: "PhrasebookCorpusEditor",
  },
];
const menu = ref(menus.find(({ name }) => name === route.name) ?? menus[0]);
watch(menu, ({ name }) => router.push({ name }));

function reset() {
  config.reset();
}
function loadLect() {
  const filename =
    store.state.root + window.prompt("Enter lect name") + config.filename;
  fetch(filename)
    .then((response) => response.json())
    .then((file) => config.setFile(file));
}
function loadJSON() {
  const json = window.prompt("Enter JSON");
  if (json) config.setFile(JSON.parse(json));
}
function saveJSON() {
  navigator.clipboard.writeText(JSON.stringify(config.file.value));
}
</script>

<style lang="scss" scoped>
#root {
  background-color: var(--color-foreground);
  margin: -1 * map-get($margins, "normal");
  margin-bottom: map-get($margins, "double");
  padding: map-get($margins, "normal");
  border-radius: 0;
  box-shadow: map-get($shadows, "elevated");
  :not(.icon) {
    font-weight: bold;
  }
}
.controls {
  flex: 1;
  justify-content: flex-end;
}
@media only screen and (max-width: $mobile-width) {
  #root .section {
    flex-flow: column;
  }
}
</style>
