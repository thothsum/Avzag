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
        if (this.$route.params.lang !== this.$store.state.language)
          this.$store.dispatch("loadLanguage", this.$route.params.lang);
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
          : { name: "Home" }
      );
  }
};
</script>
