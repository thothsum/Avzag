<template>
  <div class="section" v-if="catalogue">
    <h1 id="header">Ævzag</h1>
    <div class="card">
      <router-link
        :to="{name: 'Phonology', params: {lang: lg}}"
        :key="lg"
        v-for="lg in languages"
      >{{lg}}</router-link>
    </div>
    <hr />
    <div class="section" id="footer">
      <div class="card">
        <p>Contact</p>
        <a href="https://twitter.com/alkaitagi">Twiter</a>
        <a href="https://t.me/alkaitagi">Telegram</a>
      </div>
      <div class="card">
        <p>Contribute</p>
        <a href="https://github.com/alkaitagi/Aevzag">GitHub</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
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
#footer {
  display: flex;
}
#footer .card {
  width: 150px;
}
</style>
