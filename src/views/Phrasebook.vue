<template>
  <div class="section" v-if="phrasebook">
    <div class="list">
      <button @click="category=i" :key="i" v-for="(ct, i) in categories">{{ct}}</button>
    </div>
    <div class="list">
      <button @click="item=i" :key="i" v-for="(it, i) in translations">{{it}}</button>
    </div>
    <div>
      <div class="card" :key="i" v-for="(sr, i) of sources">
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
  }
};
</script>

<style scoped>
.section {
  display: flex;
}
.section > *:not(:last-child) {
  margin-right: var(--margin-double);
}
.card {
  box-shadow: var(--shadow);
}
@media only screen and (max-width: 568px) {
}
</style>
