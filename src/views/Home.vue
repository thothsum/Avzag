<template>
  <div v-if="catalogue">
    <div id="header" class="section panel-horizontal">
      <h1>Ævzag</h1>
      <div class="panel-horizontal">
        <a href="https://twitter.com/alkaitagi">Twitter</a>
        <a href="https://github.com/alkaitagi/Aevzag">GitHub</a>
        <span class="text-faded no-select">•</span>
        <a href="https://github.com/alkaitagi/Aevzag/blob/master/credits.md#credits">Credits</a>
      </div>
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
    LanguageCard,
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
    };
  },
  computed: {
    catalogue() {
      return this.$store.state.catalogue;
    },
    languages() {
      return Object.keys(this.catalogue).sort((a, b) => a.localeCompare(b));
    },
  },
};
</script>

<style lang="scss" scoped>
$card-size: 192px;
#header {
  flex-wrap: wrap;
}
#languages {
  display: grid;
  gap: map-get($margins, "double");
  place-items: stretch;
  grid-auto-rows: $card-size;
  grid-template-columns: repeat(auto-fit, minmax($card-size, 1fr));
}
</style>
