<template>
  <div id="banner">
    <div id="flag">
      <img :src="banner" alt="Banner" />
    </div>
    <div id="titles">
      <h1>{{title}}</h1>
      <h2>{{subtitle}}</h2>
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
    title() {
      return this.$store.state.language;
    },
    subtitle() {
      return this.$store.getters.languageInfo?.family.reduce(
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
