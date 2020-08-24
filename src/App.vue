<template>
  <div id="app">
    <Header v-if="showHeader" />
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
  computed: {
    showHeader() {
      return (
        this.$route.name != "Home" && !this.$route.path.includes("/editor/")
      );
    },
  },
  created() {
    this.$store.dispatch("initialize");
    this.$store.dispatch("loadLects", ["Iron", "Kaitag", "Kabardian"]);
  },
});
</script>

<style lang="scss">
@import "scss/style.scss";
</style>
