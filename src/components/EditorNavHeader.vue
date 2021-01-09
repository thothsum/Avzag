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
        <control icon="language" />
        <control icon="code" />
        <control icon="integration_instructions" />
        <ButtonAlert />
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
import { useRouter } from "vue-router";

const router = useRouter();
const attrs = useContext().attrs;

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
const menu = ref(menus[0]);
watch(menu, ({ name }) => router.push({ name }));
</script>

<style lang="scss" scoped>
#root {
  background-color: var(--color-foreground);
  margin: -1 * map-get($margins, "normal");
  margin-bottom: map-get($margins, "double");
  padding: map-get($margins, "normal");
  border-radius: 0;
  box-shadow: map-get($shadows, "elevated");
}
:not(.icon) {
  font-weight: bold;
}
.controls {
  flex: 1;
  justify-content: flex-end;
}
</style>
