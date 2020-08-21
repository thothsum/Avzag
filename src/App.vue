<template>
  <div id="app">
    <Header v-if="$route.name!=='Home'" />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Header from "./components/Header.vue";

export default Vue.extend({
  name: "App",
  components: {
    Header,
  },
  data() {
    return {
      language: undefined,
    };
  },
  created() {
    this.$store.dispatch("initialize");
    this.$store.dispatch("loadLects", ["Iron", "Aqusha"]);
  },
});
</script>

<style lang="scss">
@import "scss/style.scss";
</style>
