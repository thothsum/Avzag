<template>
  <div class="section" v-if="catalogue">
    <div id="languages">
      <a :key="i" @click="$emit('language', lg)" v-for="(lg, i) in catalogue">{{lg}}</a>
    </div>
    <p id="soon">
      <i>A proper map is coming soon...</i>
    </p>
    <div id="footer">
      <hr />
      <a href="https://github.com/alkaitagi/Aevzag">source</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Map",
  props: ["langRoot"],
  watch: {
    langRoot: {
      handler: async function(langRoot) {
        const res = await fetch(langRoot + "index.json");
        this.index = await res.json();
      },
      immediate: true
    }
  },
  data() {
    return {
      index: undefined,
      catalogue: undefined
    };
  },
  async created() {
    const res = await fetch(this.langRoot + "../catalogue.json");
    let ctg = await res.json();
    ctg.sort((a, b) => a.localeCompare(b));
    this.catalogue = ctg;
  }
};
</script>

<style scoped>
* {
  display: flex;
  place-content: center;
}
.section {
  flex-wrap: wrap;
}
#languages,
#soon,
hr {
  width: 100%;
}
#languages > * {
  margin: 5px;
}
#footer {
  width: 300px;
  flex-wrap: wrap;
}
</style>
