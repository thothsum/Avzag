<template>
  <router-view />
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import { watchEffect, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { setupStore } from "./store";

const route = useRoute();
const router = useRouter();

if (!route.name || route.name === "Home") {
  router.push(
    localStorage.url && localStorage.url !== route.path
      ? { path: localStorage.url }
      : { name: "Home" }
  );
}
if (route.name !== "Home") {
  const lects = JSON.parse(localStorage.lects ?? "[]");
  setupStore(lects);
}
watchEffect(() => {
  if (route.name) localStorage.url = route.path;
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Material+Icons+Outlined");
@import url("https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;700&display=swap");

@import "scss/panels";
@import "scss/scroll";
@import "scss/text";
@import "scss/controls";
@import "scss/body";
@import "scss/highlight";
@import "scss/colored";
</style>
