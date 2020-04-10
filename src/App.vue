<template>
  <div id="app" v-if="index">
    <div class="section" id="header">
      <div id="banner">
        <div id="flag">
          <img :src="langRoot + 'flag.png'" alt="Banner" />
        </div>
        <div id="titles">
          <h1>{{index.title}}</h1>
          <h3>{{index.tags.reduce((a, t) => a = `${a} › ${t}`)}}</h3>
        </div>
      </div>
      <div id="menu">
        <button
          class="nav"
          :class=" { selected: menu === i}"
          @click="menu=i"
          :key="i"
          v-for="(sct, i) in ['Map', 'Phonology', 'Converter']"
        >{{sct}}</button>
      </div>
    </div>
    <Map :langRoot="langRoot" v-show="menu==0" @language="language=$event" />
    <Phonology :langRoot="langRoot" v-show="menu==1" />
    <Converter :langRoot="langRoot" v-show="menu==2" />
  </div>
</template>

<script>
import Map from "./components/Map";
import Phonology from "./components/Phonology";
import Converter from "./components/Converter";

export default {
  name: "App",
  data() {
    return {
      language: undefined,
      catalogue: undefined,
      index: undefined,
      menu: 0
    };
  },
  components: {
    Map,
    Phonology,
    Converter
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
#header {
  border-radius: 0 0 4px 4px;
  box-shadow: 0px 5px 10px var(--shadow);
  height: 75px;
  display: flex;
  align-items: center;
  padding: 10px 5px;
}
#banner > *,
#menu > * {
  margin: 5px;
}
#banner,
#menu {
  width: 50%;
  padding: 10px 5px;
  display: flex;
  align-content: center;
}
#banner {
  justify-content: flex-start;
}
#menu {
  justify-content: flex-end;
}
#titles {
  line-height: 50%;
  place-content: center;
}
#titles h1 {
  font-size: 24px;
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
#flag {
  height: 60px;
  display: flex;
}
#flag > img {
  height: 100%;
  box-shadow: 0 0 10px var(--shadow);
}
@media only screen and (max-width: 750px) {
  #header {
    height: fit-content;
    flex-wrap: wrap;
    justify-content: center;
  }
  #banner,
  #menu {
    width: 100%;
    justify-content: center;
  }
}
@media only screen and (max-width: 600px) {
  #banner {
    flex-flow: column;
    place-content: center;
  }
  #flag {
    place-content: center;
  }
  #titles {
    text-align: center;
  }
  #menu {
    flex-wrap: wrap;
  }
}
</style>
