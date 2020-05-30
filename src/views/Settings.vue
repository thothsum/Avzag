<template>
  <div class="section">
    <div class="card">
      <h2>Languages</h2>
      <router-link
        :to="{name: $route.name, params: {lang: lg}}"
        :key="lg"
        v-for="lg in catalogue"
      >{{lg}}</router-link>
    </div>
    <div class="card">
      <h2>Contribute</h2>
      <a href="https://github.com/alkaitagi/Aevzag">GitHub</a>
    </div>
    <div class="card">
      <h2>Contact</h2>
      <a href="https://twitter.com/alkaitagi">Twiter</a>
      <a href="https://t.me/alkaitagi">Telegram</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Settings",
  computed: {
    catalogue() {
      return this.$store.state.catalogue;
    }
  }
};
</script>

<style scoped>
.section {
  display: flex;
  flex-wrap: wrap;
}
.card {
  width: 150px;
}
</style>
