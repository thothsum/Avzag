<template>
  <div id="catalogue" class="section">
    <router-link
      :to="{name: $route.name, params: {lang: lg}}"
      :key="i"
      v-for="(lg, i) in catalogue"
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
    const res = await fetch(process.env.BASE_URL + "languages/catalogue.json");
    let ctg = await res.json();
    ctg.sort((a, b) => a.localeCompare(b));
    this.catalogue = ctg;
  }
};
</script>

<style scoped>
#catalogue {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  box-shadow: 0px 2.5px 5px var(--shadow);
  padding: 5px 0;
  margin-top: -25px;
}
#catalogue > * {
  margin: 0 5px;
}
</style>