<template>
  <div class="card">
    <p :key="i" v-for="(pair, i) in noones">
      <span class="text-faded">{{pair[0].replace(" ", "_")}}</span>
      <span>{{pair[1].replace(" ", "_")}}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "MappingTable",
  props: ["mapping"],
  computed: {
    noones() {
      return this.mapping.filter(a => !a[0].includes("1"));
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: repeat(auto-fill, 60px);
  column-gap: var(--margin);
  place-content: center;
}
p {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--margin);
  span {
    font-size: var(--font-size-small);
    &:nth-child(1) {
      text-align: right;
    }
  }
}
</style>
