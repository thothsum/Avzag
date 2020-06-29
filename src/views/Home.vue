<template>
  <div v-if="catalogue">
    <div class="section">
      <h1 id="header">Ævzag</h1>
    </div>
    <div class="section cards">
      <LanguageCard :key="i" v-for="(lg, i) in languages" :language="lg" />
    </div>
    <div class="section cards" id="footer">
      <div class="card">
        <h3>Contact</h3>
        <a href="https://twitter.com/alkaitagi">Twitter</a>
        <a href="https://t.me/alkaitagi">Telegram</a>
      </div>
      <div class="card">
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
.section.cards {
  display: flex;
  flex-wrap: wrap;
  > *:not(:last-child) {
    margin: 0 var(--margin-large) var(--margin-large) 0;
  }
}
#footer .card {
  min-width: 100px;
  width: 100px;
  background-color: transparent;
  box-shadow: none;
  padding: 0;
}
</style>
