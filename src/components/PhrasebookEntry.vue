<template>
  <div class="card panel-horizontal">
    <h3>{{lect}}</h3>
    <span class="text-dot"></span>
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
h3 {
  flex: 0;
}
div {
  place-items: start;
  line-height: 175%;
}
</style>
