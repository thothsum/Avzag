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
      <div class="card" :key="i" v-for="(sr, i) of sources">
        <b>{{i}}</b>
        <p>{{sr.text}}</p>
        <p class="txt-faded">
          <span>/</span>
          {{sr.ipa}}
          <span>/</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Phrasebook",
  data() {
    return {
      category: 0,
      item: 0
    };
  },
  computed: {
    lects() {
      return this.$store.getters.languageInfo?.lects;
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
    category() {
      this.item = 0;
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
.card {
  box-shadow: var(--shadow);
}
.list > button {
  border: var(--border-width) solid transparent;
}
h3 {
  margin-bottom: var(--margin-double);
}
.sources {
  display: flex;
  flex-wrap: wrap;
}
.sources > .card * {
  line-height: 100%;
}
@media only screen and (max-width: 568px) {
}
</style>
