<template>
  <div id="root" v-bind="attrs" class="small">
    <div class="section row-1 scroll">
      <router-link v-slot="{ isActive, navigate }" custom to="Home">
        <control
          :class="{ highlight: isActive }"
          icon="arrow_back"
          @click="navigate"
        />
      </router-link>
      <Select v-model="menu" :items="menus" label-key="text" />
    </div>
  </div>
  <router-view />
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import Select from "./Select";
import { ref, useContext, watchEffect } from "vue";
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
watchEffect(() => router.push({ name: menu.value.name }));
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
</style>
