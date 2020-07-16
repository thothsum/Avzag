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
    Header
  },
  data() {
    return {
      language: undefined
    };
  },
  watch: {
    "$route.params.lang": {
      async handler() {
        let language = this.$route.params.lang;
        if (language && language !== this.$store.state.language)
          this.$store.dispatch("loadLanguage", language);
      },
      immediate: true
    },
    "$route.path": {
      handler(): void {
        if (this.$route.name) localStorage.url = this.$route.path;
      }
    }
  },
  created() {
    this.$store.dispatch("loadCatalogue");
    if (!this.$route.name || this.$route.name === "Home")
      this.$router.push(
        localStorage.url && localStorage.url !== this.$route.path
          ? { path: localStorage.url }
          : { name: "Home" }
      );
  }
});
</script>

<style lang="scss">
@import "scss/style.scss";
</style>
