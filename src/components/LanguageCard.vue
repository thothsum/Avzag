<template>
  <div class="card">
    <button @click="$router.push({name: 'Phonology', params: {lang: language}})">
      <h2>{{language}}</h2>
    </button>
    <div class="list">
      <li :key="i" v-for="(lc, i) in lects">{{lc}}</li>
    </div>
  </div>
</template>

<script>
export default {
  name: "LanguageCard",
  props: ["language"],
  computed: {
    info() {
      return this.$store.state.catalogue[this.language];
    },
    lects() {
      return Object.values(this.info.lects).sort((a, b) => a.localeCompare(b));
    }
  }
};
</script>

<style scoped>
a {
  margin: calc(var(--margin-double) * -1);
  margin-bottom: var(--margin-double);
}
.card {
  padding: var(--margin-double);
  min-width: 150px;
  width: 150px;
  box-shadow: var(--shadow);
  margin-bottom: 0;
}
.list {
  max-height: 300px;
}
</style>
