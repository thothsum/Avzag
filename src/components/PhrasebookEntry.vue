<template>
  <div class="card">
    <h3>{{lect}}</h3>
    <span>{{source.text}}</span>
    <span class="text-faded text-ipa">{{source.ipa}}</span>
  </div>
</template>

<script>
export default {
  name: "PhrasebookEntry",
  props: ["lect", "source"]
};
</script>

<style lang="scss" scoped>
.card {
  height: min-content;
  display: grid;
  gap: map-get($margins, "normal");
  grid-template-columns: 100px 1fr 1fr;
  box-shadow: map-get($shadows, "normal");
}
@media only screen and (max-width: $mobile-width) {
  .card {
    grid-template-columns: 1fr;
  }
}
</style>
