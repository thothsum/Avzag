<template>
  <div class="section" v-if="catalogue">
    <a :key="i" @click="$emit('language', lg)" v-for="(lg, i) in catalogue">{{lg}}</a>
    <div>
      <a href>sueta</a>
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
