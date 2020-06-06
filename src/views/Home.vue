<template>
  <div v-if="catalogue">
    <div class="section">
      <h1 id="header">Ævzag</h1>
    </div>
    <div class="section">
      <LanguageCard :key="i" v-for="(lg, i) in languages" :language="lg" />
    </div>
    <hr />
    <div class="section" id="footer">
      <div class="card">
        <h2>Contact</h2>
        <a href="https://twitter.com/alkaitagi">Twiter</a>
        <a href="https://t.me/alkaitagi">Telegram</a>
      </div>
      <div class="card">
        <h2>Contribute</h2>
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

<style scoped>
h1#header {
  font-size: calc(2 * var(--font-size-large));
}
.section {
  display: flex;
  flex-wrap: wrap;
}
.section > *:not(:last-child) {
  margin-right: var(--margin-large);
}
#footer .card {
  width: 150px;
}
</style>
