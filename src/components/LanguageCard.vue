<template>
  <div class="card">
    <router-link :to="{name: 'Phonology', params: {lang: language}}">
      <h1>{{language}}</h1>
    </router-link>
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
.card {
  width: 150px;
}
.list {
  max-height: 300px;
}
</style>
