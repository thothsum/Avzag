<template>
  <div id="root">
    <p class="txt-caption" :key="i" v-for="(pair, i) in noones">
      <span class="txt-faded">{{pair[0].replace(" ", "_")}}</span>
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

<style scoped>
#root {
  display: flex;
  flex-wrap: wrap;
  padding: var(--margin);
  place-content: center;
}
p {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  place-content: center;
  width: 60px;
  margin: var(--padding);
}
span {
  width: 50%;
}
span:nth-child(1) {
  margin-right: var(--padding);
  text-align: right;
}
span:nth-child(2) {
  margin-left: var(--padding);
}
</style>
