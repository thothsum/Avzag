<template>
  <div v-if="pairs.length > 0" class="card row-1 wrap">
    <p v-for="(p, i) in pairs" :key="i">
      <span class="text-faded">{{ p[left].replace(" ", "_") }}</span>
      <span>{{ p[right].replace(" ", "_") }}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "MappingTable",
  props: ["mapping", "reverse"],
  computed: {
    pairs() {
      return this.mapping.pairs;
    },
    left() {
      return this.reverse ? 1 : 0;
    },
    right() {
      return this.reverse ? 0 : 1;
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
