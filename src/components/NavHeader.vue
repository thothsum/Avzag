<template>
  <div id="root">
    <div class="section row-1 scroll">
      <router-link
        v-for="{ icon, text, name } in navs"
        :key="name ?? text ?? icon"
        v-slot="{ isActive, navigate }"
        custom
        :to="{ name: name ?? text }"
      >
        <control
          :class="{ highlight: isActive }"
          :icon="icon"
          :text="text"
          @click="navigate"
        />
      </router-link>
    </div>
  </div>
  <router-view />
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import { PropType, defineProps } from "vue";

interface Nav {
  icon?: string;
  text?: string;
  name?: string;
}

const props = defineProps({
  navs: {
    type: Array as PropType<Nav[]>,
    default: [
      { icon: "arrow_back", name: "Home" },
      { icon: "audiotrack", text: "Phonology" },
      { icon: "sync_alt", text: "Converter" },
      { icon: "book", text: "Phrasebook" },
    ],
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
