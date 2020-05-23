<template>
  <div id="banner">
    <div id="flag">
      <img :src="banner" alt="Banner" />
    </div>
    <div id="titles">
      <h1>{{title}}</h1>
      <h3>{{subtitle}}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderBanner",
  data() {
    return {
      index: undefined
    };
  },
  computed: {
    banner() {
      return this.$store.getters.languageRoot + "flag.png";
    },
    title() {
      return this.$store.state.index?.title;
    },
    subtitle() {
      return this.$store.state.index?.tags.reduce((a, t) => (a = a + " › " + t));
    }
  }
};
</script>

<style scoped>
#banner {
  display: flex;
  align-content: center;
  justify-content: flex-start;
}
#banner > * {
  margin: 0 5px;
}
#flag {
  height: 40px;
  display: flex;
  margin: 5px;
}
#flag > img {
  height: 100%;
  box-shadow: 0 0 10px var(--shadow);
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