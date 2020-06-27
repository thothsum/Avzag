<template>
  <div id="app">
    <Header v-if="$route.name!=='Home'" />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
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
    $route: {
      async handler() {
        if (this.$route.name) localStorage.url = this.$route.path;

        let language = this.$route.params.lang;
        if (language && language !== this.$store.state.language)
          this.$store.dispatch("loadLanguage", language);
      },
      immediate: true
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
};
</script>
