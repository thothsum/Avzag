<template>
  <div class="panel-horizontal">
    <img :src="flag" alt="flag" />
    <h2>{{language}}</h2>
  </div>
</template>

<script>
export default {
  name: "LanguageBanner",
  computed: {
    flag() {
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

<style lang="scss" scoped>
img {
  height: var(--control-height);
}
</style>
