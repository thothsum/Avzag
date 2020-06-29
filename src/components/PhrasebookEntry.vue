<template>
  <div class="card">
    <b>{{lect}}</b>
    <span>{{source.text}}</span>
    <span class="txt-faded txt-ipa">/{{source.ipa}}/</span>
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
  grid-template-columns: 100px 1fr 1fr;
  box-shadow: var(--shadow);
}
@media only screen and (max-width: 568px) {
  .card {
    grid-template-columns: 1fr;
  }
}
</style>
