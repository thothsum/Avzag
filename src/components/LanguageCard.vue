<template>
  <div class="card" @click="$router.push({ name: 'Phonology', params: { lang: language } })">
    <div id="header">
      <img :src="flag" alt="flag" />
      <h2>{{ language }}</h2>
    </div>
    <div class="list">
      <p :key="i" v-for="(lc, i) in lects">{{ lc }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "LanguageCard",
  props: ["language"],
  computed: {
    flag() {
      return this.$store.state.root + this.language + "/flag.png";
    },
    info() {
      return this.$store.state.catalogue[this.language];
    },
    lects() {
      return Object.values(this.info.lects).sort((a, b) => a.localeCompare(b));
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  min-width: 150px;
  width: 150px;
  height: 175px;
  display: grid;
  grid-template-rows: 100px 1fr;

  &:hover {
    cursor: pointer;
    box-shadow: var(--shadow-elevated);
  }
}


button {
  min-height: var(--control-height);
  margin: 0;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  justify-content: space-between;
}
img {
  width: 100%;
  height: 100%;
}
.list {
  max-height: 300px;
  padding: var(--margin-double);
  margin: 0;
}
</style>
