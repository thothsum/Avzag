<template>
  <div id="app">
    <div class="section" id="header">
      <HeaderBanner />
      <div id="menu">
        <button
          @click="navigate(sct)"
          class="nav"
          :class="{selected: $route.name===sct}"
          :key="i"
          v-for="(sct, i) in ['Phonology', 'Converter']"
        >{{sct}}</button>
        <button
          class="nav material-icons-outlined"
          @click="showCatalogue=!showCatalogue"
          :class="{selected: showCatalogue}"
          style="font-size: 24px"
        >settings</button>
      </div>
    </div>
    <HeaderCatalogue v-show="showCatalogue" />
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderBanner from "./components/HeaderBanner";
import HeaderCatalogue from "./components/HeaderCatalogue";

export default {
  name: "App",
  components: {
    HeaderBanner,
    HeaderCatalogue
  },
  data() {
    return {
      language: undefined,
      showCatalogue: false
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
          : { name: "Converter", params: { lang: "Ossetian" } }
      );
  },
  methods: {
    navigate(section) {
      if (this.$route.name !== section)
        this.$router.push({
          name: section,
          params: { lang: this.$route.params.lang }
        });
    }
  }
};
</script>

<style scoped>
#header {
  border-radius: 0 0 4px 4px;
  box-shadow: 0px 5px 10px var(--shadow);
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
}
#menu {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
#menu > * {
  margin: 5px;
}
button.nav {
  font-size: 16px;
  padding: 0 15px;
  height: 40px;
}
button.nav {
  border-width: 0 0 4px 0;
  border-color: var(--shadow);
}
button.nav:hover {
  border-color: var(--text);
}
button.nav.selected {
  border-color: var(--text);
}
@media only screen and (max-width: 600px) {
  #header {
    height: fit-content;
    flex-flow: column;
    justify-content: center;
  }
}
</style>
