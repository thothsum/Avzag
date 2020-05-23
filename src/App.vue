<template>
  <div id="app">
    <div class="section" id="header">
      <HeaderBanner />
      <div id="menu">
        <router-link
          :to="{name: sct, params: {lang: $route.params.lang}}"
          :key="i"
          v-for="(sct, i) in ['Phonology', 'Converter']"
        >{{sct}}</router-link>
        <button
          class="nav"
          @click="showCatalogue=!showCatalogue"
          :class=" { selected: showCatalogue}"
        >🏔</button>
      </div>
    </div>
    <div id="catalogue" class="section" v-show="showCatalogue">
      <router-link
        :to="{name: $route.name, params: {lang: lg}}"
        :key="i"
        v-for="(lg, i) in catalogue"
      >{{lg}}</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderBanner from "./components/HeaderBanner";

import Vue from "vue";

Vue.prototype.$getPath = l => {
  return process.env.BASE_URL + "languages/" + l + "/";
};

export default {
  name: "App",
  components: {
    HeaderBanner
  },
  data() {
    return {
      language: undefined,
      catalogue: undefined,
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
    const res = await fetch(this.root + "/catalogue.json");
    let ctg = await res.json();
    ctg.sort((a, b) => a.localeCompare(b));
    this.catalogue = ctg;

    this.language = this.catalogue.includes(localStorage.language)
      ? localStorage.language
      : this.catalogue[0];
    if (localStorage.menu) this.menu = localStorage.menu;
  },
  computed: {
    langRoot: function() {
      return this.language ? `${this.root}${this.language}/` : undefined;
    },
    root: function() {
      return `${process.env.BASE_URL}languages/`;
    }
  }
};
</script>

<style scoped>
#catalogue {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  box-shadow: 0px 2.5px 5px var(--shadow);
  padding: 15px 0 5px 0;
  margin-top: -35px;
}
#catalogue > * {
  margin: 0 5px;
}
#header {
  border-radius: 0 0 4px 4px;
  box-shadow: 0px 5px 10px var(--shadow);
  height: 60px;
  display: flex;
  align-items: center;
  padding: 5px;
}
HeaderBanner {
  width: 50%;
}
#menu > * {
  margin: 5px;
}
#menu {
  width: 50%;
  display: flex;
  align-content: center;
  justify-content: flex-end;
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
    flex-wrap: wrap;
    justify-content: center;
  }
  HeaderBanner {
    width: 100%;
  }
  #menu {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }
}
</style>
