<template>
  <div class="card">
    <router-link :to="{name: 'Phonology', params: {lang: language}}">
      <h2>{{language}}</h2>
    </router-link>
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
.card {
  min-width: 150px;
  width: 150px;
}
.list {
  max-height: 300px;
}
</style>
