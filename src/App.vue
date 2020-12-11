<template>
  <div id="app">
    <Header v-if="showHeader" />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/Header.vue";

export default {
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
  watch: {
    "$route.path": {
      handler() {
        if (this.$route.name) localStorage.url = this.$route.path;
      },
    },
  },
  created() {
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
  },
};
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
