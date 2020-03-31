<template>
  <div id="app">
    <Header :langRoot="langRoot" :menu="menu" @menu="menu=$event" @language="language=$event" />
    <Info :langRoot="langRoot" v-show="menu==0" />
    <Phonology :langRoot="langRoot" v-show="menu==1" />
    <Converter :langRoot="langRoot" v-show="menu==2" />
  </div>
</template>

<script>
import config from "../vue.config";

import Header from "./components/Header";
import Info from "./components/Info";
import Phonology from "./components/Phonology";
import Converter from "./components/Converter";

export default {
  name: "App",
  data() {
    return {
      language: "Kaitag",
      menu: 0
    };
  },
  watch: {
    langRoot: {
      handler: async function(langRoot) {
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
  components: {
    Header,
    Info,
    Phonology,
    Converter
  },
  created() {
    if (localStorage.language) this.language = localStorage.language;
    if (localStorage.menu) this.menu = localStorage.menu;
  },
  computed: {
    langRoot: function() {
      return `${config.publicPath}languages/${this.language}/`;
    }
  }
};
</script>
