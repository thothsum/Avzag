<template>
  <div id="app">
    <div class="section" id="header">
      <HeaderBanner />
      <div id="menu">
        <button
          @click="navigate(sct)"
          class="nav"
          :class=" { selected: $route.name === sct}"
          :key="i"
          v-for="(sct, i) in ['Phonology', 'Converter']"
        >{{sct}}</button>
        <button
          class="nav"
          @click="showCatalogue=!showCatalogue"
          :class=" { selected: showCatalogue}"
        >🏔</button>
      </div>
    </div>
    <HeaderCatalogue v-show="showCatalogue" />
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderBanner from "./components/HeaderBanner";
import HeaderCatalogue from "./components/HeaderCatalogue";

import Vue from "vue";

Vue.prototype.$getPath = l => {
  return process.env.BASE_URL + "languages/" + l + "/";
};

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
    langRoot: {
      handler: async function(langRoot) {
        if (!langRoot) return;
        const res = await fetch(langRoot + "index.json");
        this.index = await res.json();
      },
      immediate: true
    },
    language(value) {
      localStorage.language = value;
    },
    menu(value) {
      localStorage.menu = value;
    }
  },
  async created() {
    // this.language = this.catalogue.includes(localStorage.language)
    //   ? localStorage.language
    //   : this.catalogue[0];
    // if (localStorage.menu) this.menu = localStorage.menu;
  },
  computed: {
    langRoot: function() {
      return this.language ? `${this.root}${this.language}/` : undefined;
    },
    root: function() {
      return `${process.env.BASE_URL}languages/`;
    }
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
