<template>
  <div class="section" v-if="phrasebook">
    <div class="list">
      <h3>Categories</h3>
      <button
        :class="{selected: i===category}"
        @click="category=i"
        :key="i"
        v-for="(ct, i) in categories"
      >{{ct}}</button>
    </div>
    <div class="list">
      <h3>Items</h3>
      <button
        :class="{selected: i===item}"
        @click="item=i"
        :key="i"
        v-for="(it, i) in translations"
      >{{it}}</button>
    </div>
    <div class="sources">
      <PhrasebookEntry
        class="card"
        :key="i"
        :lect="lc"
        :source="sources[lc]"
        v-for="(lc, i) of lects"
      />
    </div>
  </div>
</template>

<script>
import PhrasebookEntry from "@/components/PhrasebookEntry";

export default {
  name: "Phrasebook",
  components: {
    PhrasebookEntry
  },
  data() {
    return {
      category: this.$route.query.category ?? 0,
      item: this.$route.query.item ?? 0
    };
  },
  computed: {
    lects() {
      return this.$store.getters.languageInfo?.lects.filter(
        l => l in this.items[this.item].sources
      );
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
.list > button {
  border: var(--border-width) solid transparent;
  height: var(--control-height);
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
