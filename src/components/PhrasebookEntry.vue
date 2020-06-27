<template>
  <div class="card">
    <b>{{lect}}</b>
    <span>{{source.text}}</span>
    <span class="txt-faded txt-ipa">{{source.ipa}}</span>
  </div>
</template>

<script>
export default {
  name: "PhrasebookEntry",
  props: ["lect", "source"]
};
</script>

<style scoped>
.card {
  height: min-content;
  display: grid;
  grid-template-columns: 100px 1fr 1fr;
  box-shadow: var(--shadow);
}
</style>
