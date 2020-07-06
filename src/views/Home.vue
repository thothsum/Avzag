<template>
  <div v-if="catalogue">
    <div class="section panel-horizontal">
      <h1 id="header">Ævzag</h1>
      <a href="https://twitter.com/alkaitagi">Twitter</a>
      <a href="https://github.com/alkaitagi/Aevzag">GitHub</a>
    </div>
    <div id="languages" class="section">
      <LanguageCard :key="i" v-for="(lg, i) in languages" :language="lg" />
    </div>
  </div>
</template>

<script>
import LanguageCard from "@/components/LanguageCard";

export default {
  name: "Home",
  components: {
    LanguageCard
  },
  data() {
    return {
      publicPath: process.env.BASE_URL
    };
  },
  computed: {
    catalogue() {
      return this.$store.state.catalogue;
    },
    languages() {
      return Object.keys(this.catalogue).sort((a, b) => a.localeCompare(b));
    }
  }
};
</script>

<style lang="scss" scoped>
$item-width: 160px;
$item-height: 192px;

#languages {
  display: grid;
  gap: map-get($margins, "double");
  place-items: stretch;
  grid-template-columns: repeat(auto-fill, $item-width);

  > * {
    width: $item-width;
    height: $item-height;
  }
}
</style>
