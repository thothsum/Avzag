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

<style lang="scss" scoped>
#root {
  display: flex;
  flex-wrap: wrap;
  padding: var(--margin);
  place-content: center;
  box-shadow: var(--shadow);
  background-color: var(--color-foreground);
}
p {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  place-content: center;
  width: 60px;
  margin: var(--margin-half);
}
span {
  width: 50%;
  font-style: normal;
}
span:nth-child(1) {
  margin-right: var(--margin-half);
  text-align: right;
}
span:nth-child(2) {
  margin-left: var(--margin-half);
}
</style>
