<template>
  <div class="card panel-horizontal wrap" v-if="mapping.length > 0">
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
div {
  justify-content: center;
  row-gap: 0;
}
p {
  width: 64px;
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
