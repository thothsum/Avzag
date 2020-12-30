<template>
  <div id="root">
    <div class="section row-1 scroll">
      <button class="icon" @click="path = 'Home'">arrow_back</button>
      <router-link
        v-for="[p, i] in menus"
        :key="p"
        v-slot="{ isActive, navigate }"
        custom
        :to="{ name: p }"
      >
        <button class="icon" :class="{ highlight: isActive }" @click="navigate">
          {{ i }}
          <p>{{ p }}</p>
        </button>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
const menus = [
  ["Phonology", "audiotrack"],
  ["Converter", "sync_alt"],
  ["Phrasebook", "book"],
];
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
