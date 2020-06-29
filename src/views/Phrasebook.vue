<template>
  <div class="section" v-if="phrasebook">
    <div id="translations" class="container">
      <h3>Category</h3>
      <select v-model="category">
        <option :value="i" :key="i" v-for="(ct, i) in categories">{{ct}}</option>
      </select>
      <h3>Phrases</h3>
      <div class="list">
        <button
          :class="{selected: i===phrase}"
          @click="phrase=i"
          :key="i"
          v-for="(tr, i) in translations"
        >{{tr}}</button>
      </div>
    </div>
    <div id="sources">
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
import PhrasebookEntry from "@/components/PhrasebookEntry";

export default {
  name: "Phrasebook",
  components: {
    PhrasebookEntry
  },
  data() {
    return {
      category: this.$route.query.category ?? 0,
      phrase: this.$route.query.phrase ?? 0
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
    phrases() {
      return this.phrasebook[this.categories[this.category]];
    },
    translations() {
      return this.phrases.map(it => it.translations.eng);
    },
    sources() {
      return this.phrases[this.phrase].sources;
    }
  },
  watch: {
    category(val) {
      this.$router.push({ query: { category: val, phrase: 0 } });
    },
    item() {
      this.$router.push({
        query: { ...this.$route.query, phrase: this.phrase }
      });
    },
    "$route.query": function(query) {
      this.category = query.category;
      this.phrase = query.phrase;
    }
  }
};
</script>

<style lang="scss" scoped>
.section {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: var(--margin-large);
}
#translations > .list > button {
  border: var(--border-width) solid transparent;
  height: var(--control-height);
}
#sources {
  display: flex;
  flex-direction: column;
  place-content: flex-start;
}
@media only screen and (max-width: 568px) {
  .section {
    grid-template-columns: 1fr;
    grid-template-rows: 300px 1fr;
  }
}
</style>
