<template>
  <div v-if="catalogue">
    <div class="section">
      <h1 id="header">Ævzag</h1>
    </div>
    <div class="section panel-horizontal-sparse">
      <LanguageCard :key="i" v-for="(lg, i) in languages" :language="lg" />
    </div>
    <div id="footer" class="section panel-horizontal">
      <div class="panel-dense">
        <h3>Contact</h3>
        <a href="https://twitter.com/alkaitagi">Twitter</a>
        <a href="https://t.me/alkaitagi">Telegram</a>
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
.panel-horizontal {
  place-items: flex-start;
}
#footer > div {
  width: 100px;
}
</style>
