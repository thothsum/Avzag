<template>
  <div class="card panel-dense" @click="$router.push({ name: 'Phonology', params: { lang: language } })">
    <h2>{{ language }}</h2>
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
.list {
  max-height: 300px;
  margin: 0;
}
</style>
