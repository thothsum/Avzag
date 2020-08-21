<template>
  <div v-if="lects">
    <div id="header" class="section panel-horizontal wrap">
      <h1>Ævzag</h1>
      <div class="panel-horizontal">
        <a href="https://github.com/alkaitagi/Avzag#contacts">Contacts</a>
        <a href="https://github.com/alkaitagi/Avzag#credits">Credits</a>
        <span class="text-dot"></span>
        <a href="https://github.com/alkaitagi/Avzag">GitHub</a>
      </div>
    </div>
    <div id="languages" class="section panel-horizontal-sparse wrap">
      <button :key="i" v-for="(l, i) in lectNames">{{l}}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  computed: {
    lects() {
      return this.$store.state.lects;
    },
    lectNames() {
      return Object.keys(this.lects);
    },
  },
};
</script>

<style lang="scss" scoped>
#languages {
  place-content: center;
  > * {
    flex: 1;
    min-width: 256px;
    height: 192px;
  }
}
</style>
