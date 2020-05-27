<template>
  <div class="section" v-if="dictionary">
    <h1>work in progress...</h1>
    <div class="list">
      <button @click="selected=i" :key="i" v-for="(t, i) in translations">{{t}}</button>
    </div>
    <div>
      <div class="card" :key="i" v-for="(l, i) in sources">
        <p>{{l.lect}}</p>
        <p>{{l.word}}</p>
        <p>[{{l.ipa}}]</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dictionary",
  components: {},
  data() {
    return {
      selected: 0
    };
  },
  computed: {
    dictionary() {
      return this.$store.state.dictionary;
    },
    translations() {
      return this.dictionary.map(d => d.translations.eng);
    },
    sources() {
      return this.dictionary[this.selected].sources;
    }
  },
  methods: {}
};
</script>

<style scoped>
.section {
  display: flex;
  flex-direction: row;
}
.list {
  height: 500px;
  width: 300px;
}
.card {
  width: 150px;
}
@media only screen and (max-width: 600px) {
}
</style>
