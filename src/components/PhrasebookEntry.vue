<template>
  <div class="card">
    <h3>{{lect}}</h3>
    <PhraseBuilder :source="source" :ids="ids" />
  </div>
</template>

<script>
import PhraseBuilder from "./PhraseBuilder";

export default {
  name: "PhrasebookEntry",
  components: {
    PhraseBuilder,
  },
  props: ["lect", "source", "ids"],
};
</script>

<style lang="scss" scoped>
.card {
  height: min-content;
  display: grid;
  gap: map-get($margins, "normal");
  grid-template-columns: 100px 1fr;
  box-shadow: map-get($shadows, "normal");
}
@media only screen and (max-width: $mobile-width) {
  .card {
    grid-template-columns: 1fr;
    gap: 0;
  }
}
</style>
