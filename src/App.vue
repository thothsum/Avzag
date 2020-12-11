<template>
  <div id="app">
    <Header v-if="showHeader" />
    <router-view></router-view>
  </div>
</template>

<script setup>
import { watch, computed, onCreated, useRoute } from "vue";
// eslint-disable-next-line
import Header from "./components/Header.vue";

const route = useRoute();

watch(route.path, () => {
  if (route.name) localStorage.url = route.path;
});

// eslint-disable-next-line
const showHeader = computed(
  () => route.name != "Home" && !route.path.includes("/editor/")
);

onCreated(() => {
  this.$store.dispatch("initialize");
  if (!this.$route.name || this.$route.name == "Home")
    this.$router.push(
      localStorage.url && localStorage.url != this.$route.path
        ? { path: localStorage.url }
        : { name: "Home" }
    );
  if (this.$route.name != "Home") {
    const lects = JSON.parse(localStorage.lects ?? "[]");
    if (lects) this.$store.dispatch("loadLects", lects);
  }
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
