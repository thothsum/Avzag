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
  name: "LanguageCard",
  props: ["language"]
//   computed: {
//     banner() {
//       return this.$store.getters.root + "" + "flag.png";
//     },
//     title() {
//       return this.$store.state.index?.title;
//     },
//     subtitle() {
//       return this.$store.state.index?.tags.reduce(
//         (a, t) => (a = a + " › " + t)
//       );
//     }
//   }
};
</script>

<style scoped>
</style>
