<template>
  <div v-if="catalogue">
    <div class="section">
      <h1 id="header">Ævzag</h1>
    </div>
    <div id="languages" class="section">
      <LanguageCard :key="i" v-for="(lg, i) in languages" :language="lg" />
    </div>
    <div id="footer" class="section panel-horizontal">
      <div class="panel-dense">
        <h3>Contact</h3>
        <a href="https://twitter.com/alkaitagi">Twitter</a>
      </div>
      <div class="panel-dense">
        <h3>Contribute</h3>
        <a href="https://github.com/alkaitagi/Aevzag">GitHub</a>
      </div>
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
#languages {
  display: grid;
  gap: map-get($margins, "double");
  place-items: stretch;
  grid-template-columns: repeat(auto-fill, 150px);
}
#footer {
  place-items: flex-start;
  > div {
    width: 100px;
  }
}
</style>
