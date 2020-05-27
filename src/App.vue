<template>
  <div id="app">
    <Header />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/Header";

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
      async handler(route) {
        if (route.name) localStorage.url = route.path;
        if (route.params.lang !== this.$store.state.language)
          this.$store.dispatch("loadLanguage", route.params.lang);
      },
      immediate: true
    }
  },
  created() {
    this.$store.dispatch("loadCatalogue");

    if (!this.$route.name)
      this.$router.push(
        localStorage.url && localStorage.url !== this.$route.path
          ? { path: localStorage.url }
          : { name: "Settings", params: { lang: "Ossetian" } }
      );
  }
};
</script>
