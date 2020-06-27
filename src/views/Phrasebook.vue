<template>
  <div class="section" v-if="phrasebook">
    <SearchList :items="categories" v-model="category" />
    <SearchList :items="translations" v-model="item" />
    <div class="sources">
      <PhrasebookEntry
        class="card"
        :key="i"
        v-for="(lc, i) in lects"
        :lect="lc"
        :source="sources[lc]"
      />
    </div>
  </div>
</template>

<script>
import SearchList from "@/components/SearchList";
import PhrasebookEntry from "@/components/PhrasebookEntry";

export default {
  name: "Phrasebook",
  components: {
    PhrasebookEntry,
    SearchList
  },
  data() {
    return {
      category: this.$route.query.category ?? 0,
      item: this.$route.query.item ?? 0
    };
  },
  computed: {
    lects() {
      return this.$store.getters.lects.filter(l => l in this.sources);
    },
    phrasebook() {
      return this.$store.state.phrasebook;
    },
    categories() {
      return Object.keys(this.phrasebook);
    },
    items() {
      return this.phrasebook[this.categories[this.category]];
    },
    translations() {
      return this.items.map(it => it.translations.eng);
    },
    sources() {
      return this.items[this.item].sources;
    }
  },
  watch: {
    category(val) {
      this.$router.push({ query: { category: val, item: 0 } });
    },
    item() {
      this.$router.push({
        query: { ...this.$route.query, item: this.item }
      });
    },
    "$route.query": function(query) {
      this.category = query.category;
      this.item = query.item;
    }
  }
};
</script>

<style scoped>
.section {
  display: grid;
  grid-template-columns: 200px 200px 1fr;
  gap: var(--margin-large);
}
h3 {
  margin-bottom: var(--margin-double);
}
.sources {
  display: flex;
  flex-wrap: wrap;
  place-content: flex-start;
}
@media only screen and (max-width: 568px) {
}
</style>
