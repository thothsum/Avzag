<template>
  <div id="root">
    <div class="section row-1 scroll">
      <button class="icon" @click="path = 'Home'">arrow_back</button>
      <ToggleGroup
        v-slot="{ item, highlight }"
        v-model="path"
        class="row-1"
        :items="menus"
        :label-key="0"
        type="key"
      >
        <button class="icon" :class="highlight">
          {{ item[1] }}
          <p>{{ item[0] }}</p>
        </button>
      </ToggleGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import ToggleGroup from "./ToggleGroup";

const route = useRoute();
const router = useRouter();

const menus = [
  ["Phonology", "audiotrack"],
  ["Converter", "sync_alt"],
  ["Phrasebook", "book"],
];
const path = computed({
  get: (): string => route.name as string,
  set: (p: string) => {
    console.log(p);
    if (route.name !== p) {
      router.push({
        name: p,
        params: { lang: route.params.lang },
      });
    }
  },
});
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
