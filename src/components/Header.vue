<template>
  <div class="section">
    <div id="header" v-if="index">
      <div id="banner">
        <img id="flag" :src="langRoot + 'flag.png'" alt="Banner" />
        <div id="titles">
          <h1>{{index.title}}</h1>
          <h3>{{index.tags.reduce((a, t) => a = `${a} • ${t}`)}}</h3>
        </div>
      </div>
      <div id="menu">
        <button
          class="nav"
          :class=" { selected: menu == i}"
          @click="$emit('menu', i)"
          :key="i"
          v-for="(sct, i) in ['Info', 'Alphabet', 'Converter']"
        >{{sct}}</button>
        <button @click="showCatalogue = !showCatalogue">🗺</button>
      </div>
    </div>
    <div id="catalogue" v-if="catalogue" v-show="showCatalogue">
      <a :key="i" @click="$emit('language', lg)" v-for="(lg, i) in catalogue">{{lg}}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: ["langRoot", "menu"],
  data() {
    return {
      showCatalogue: false,
      index: undefined,
      catalogue: undefined
    };
  },
  watch: {
    langRoot: {
      handler: async function(langRoot) {
        const res = await fetch(langRoot + "index.json");
        this.index = await res.json();
      },
      immediate: true
    }
  },
  async created() {
    const res = await fetch("./languages/catalogue.json");
    let ctg = await res.json();
    ctg.sort((a, b) => a.localeCompare(b));
    this.catalogue = ctg;
  }
};
</script>

<style scoped>
#header {
  border-radius: 0 0 4px 4px;
  box-shadow: 0px 5px 10px var(--nord4);
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

#catalogue {
  border-radius: 0 0 4px 4px;
  box-shadow: 0px 2.5px 2.5px var(--nord4);
  display: flex;
  place-content: center;
  margin-top: -10px;
  padding-top: 10px;
}

#titles {
  line-height: 50%;
  place-content: center;
}

#titles h1 {
  font-size: 24px;
}

button,
button.nav {
  font-size: 16px;
  padding: 0 15px;
  height: 40px;
}

button.nav {
  border-width: 0 0 4px 0;
  border-color: var(--nord4);
}

button.nav:hover {
  border-color: var(--nord0);
}

.section {
  display: flex;
  flex-direction: column;
  place-content: center;
}

button.nav.selected {
  border-color: var(--nord0);
  font-weight: bold;
}

#flag {
  height: 60px;
  box-shadow: 0 0 10px var(--nord4);
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
</style>
