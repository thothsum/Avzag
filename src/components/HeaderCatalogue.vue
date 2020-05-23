<template>
  <div class="section">
    <router-link
      :to="{name: $route.name, params: {lang: lg}}"
      :key="lg"
      v-for="lg in catalogue"
    >{{lg}}</router-link>
  </div>
</template>

<script>
export default {
  name: "HeaderCatalogue",
  data() {
    return {
      catalogue: undefined
    };
  },
  async created() {
    this.catalogue = await fetch(this.$getPath("catalogue.json"))
      .then(r => r.json())
      .then(r => r.sort((a, b) => a.localeCompare(b)));
  }
};
</script>

<style scoped>
.section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  box-shadow: 0px 2.5px 5px var(--shadow);
  padding: 5px 0;
  margin-top: -25px;
}
.section > * {
  margin: 0 5px;
}
</style>