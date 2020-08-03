<template>
  <div class="card" v-if="mapping.length > 0">
    <p :key="i" v-for="(pair, i) in mapping">
      <span class="text-faded">{{pair[0].replace(" ", "_")}}</span>
      <span>{{pair[1].replace(" ", "_")}}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "MappingTable",
  props: ["mapping"],
};
</script>

<style lang="scss" scoped>
.card {
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: repeat(auto-fill, 60px);
  column-gap: map-get($margins, "half");
  place-content: center;
}
p {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: map-get($margins, "half");
  span {
    font-size: map-get($font-sizes, "small");
    &:first-child {
      text-align: right;
    }
  }
}
</style>
