<template>
  <div class="card">
    <button @click="$router.push({name: 'Phonology', params: {lang: language}})">
      <h2>{{language}}</h2>
    </button>
    <div class="list">
      <p :key="i" v-for="(lc, i) in lects">{{lc}}</p>
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
button {
  min-height: var(--control-height);
  margin: 0;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.card {
  min-width: 150px;
  width: 150px;
  height: 175px;
  box-shadow: var(--shadow);;
}
.list {
  max-height: 300px;
  padding: var(--margin-double);
}
</style>
