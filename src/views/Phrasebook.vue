<template>
  <div class="section" v-if="phrasebook">
    <div id="translations" class="panel">
      <h3>Category</h3>
      <select v-model="category">
        <option :value="i" :key="i" v-for="(ct, i) in categories">{{ct}}</option>
      </select>
      <h3>Phrases</h3>
      <div class="panel-solid scroll-y">
        <button
          :class="{highlight: i===phrase}"
          @click="phrase=i"
          :key="i"
          v-for="(tr, i) in translations"
        >{{tr}}</button>
      </div>
    </div>
    <div class="panel">
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
    category(category) {
      this.$router
        .push({ query: { category: category, phrase: 0 } })
        .catch(() => {});
    },
    phrase(phrase) {
      this.$router
        .push({ query: { ...this.$route.query, phrase: phrase } })
        .catch(() => {});
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
  gap: map-get($margins, "double");
}
.panel-solid {
  max-height: 7 * $control-height;
}
@media only screen and (max-width: $mobile-width) {
  .section {
    grid-template-columns: 1fr;
    grid-template-rows: 300px 1fr;
  }
}
</style>
