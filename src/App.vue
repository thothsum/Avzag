<template>
  <div id="app">
    <Header v-if="showHeader" />
    <router-view></router-view>
  </div>
</template>

<script setup>
import { watchEffect, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
// eslint-disable-next-line
import Header from "./components/Header.vue";

const route = useRoute()
const router = useRouter()
const store = useStore()

watchEffect(() => {
  if (route.name) {
    localStorage.url = route.path
    console.log(route.path)
  }
})

// eslint-disable-next-line
const showHeader = computed(
  () => route.name != 'Home' && !route.path.includes('/editor/')
)

store.dispatch('initialize')
if (!route.name || route.name == 'Home') {
  router.push(
    localStorage.url && localStorage.url != route.path
      ? { path: localStorage.url }
      : { name: 'Home' }
  )
}
if (route.name != 'Home') {
  const lects = JSON.parse(localStorage.lects ?? '[]')
  if (lects) store.dispatch('loadLects', lects)
}
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
