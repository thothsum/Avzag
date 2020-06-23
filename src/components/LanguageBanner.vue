<template>
  <div id="banner">
    <img :src="banner" alt="flag" />
    <h2>{{language}}</h2>
  </div>
</template>

<script>
export default {
  name: "LanguageBanner",
  computed: {
    banner() {
      return this.$store.getters.languageRoot + "flag.png";
    },
    language() {
      return this.$store.state.language;
    },
    catalogue() {
      return this.$store.state.catalogue;
    }
  }
};
</script>

<style scoped>
#banner {
  display: flex;
  place-items: center;
  justify-content: flex-start;
}
img {
  height: var(--control-height);
  display: flex;
  margin-right: var(--margin-double);
}
</style>
