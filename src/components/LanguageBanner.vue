<template>
  <div id="banner">
    <div id="flag">
      <img :src="banner" alt="Banner" />
    </div>
    <div id="titles">
      <h2>{{language}}</h2>
      <h3 v-if="catalogue">{{subtitle}}</h3>
    </div>
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
    },
    subtitle() {
      return this.catalogue[this.language].family.reduce(
        (a, t) => (a = a + " › " + t)
      );
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
#flag {
  height: 42px;
  display: flex;
  margin-right: var(--margin-double);
}
#flag > img {
  height: 100%;
  box-shadow: var(--shadow-small);
}
#titles {
  display: flex;
  flex-direction: column;
  place-content: center;
}
#titles > * {
  margin: 0;
}
</style>
