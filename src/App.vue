<template>
  <div id="app">
    <div class="section" id="header">
      <HeaderBanner />
      <div id="menu">
        <button @click="navigate('Phonology')" :class="{selected: $route.name==='Phonology'}">
          <p class="material-icons-outlined">volume_up</p>
          <p>Phonology</p>
        </button>
        <button @click="navigate('Converter')" :class="{selected: $route.name==='Converter'}">
          <p class="material-icons-outlined">compare_arrows</p>
          <p>Converter</p>
        </button>
        <button @click="showCatalogue=!showCatalogue" :class="{selected: showCatalogue}">
          <p class="material-icons-outlined">settings</p>
        </button>
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
#menu > button {
  font-size: 16px;
  padding: 0 15px;
  height: 40px;
  border-width: 0 0 4px 0;
  border-color: var(--shadow);
}
.material-icons-outlined {
  font-size: 20px;
}
#menu > button > *:first-child:not(:last-child) {
  margin-right: 10px;
}
#menu > button:hover {
  border-color: var(--text);
}
#menu > button.selected {
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
