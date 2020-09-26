<template>
  <div class="card panel-horizontal wrap" v-if="mapping.length > 0">
    <p :key="i" v-for="(pair, i) in mapping">
      <span class="text-faded">{{pair[left].replace(" ", "_")}}</span>
      <span>{{pair[right].replace(" ", "_")}}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "MappingTable",
  props: ["mapping", "reverse"],
  computed: {
    left() {
      return this.reverse ? 0 : 1;
    },
    right() {
      return this.reverse ? 1 : 0;
    },
  },
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
