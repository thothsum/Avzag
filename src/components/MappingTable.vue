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
  box-shadow: var(--shadow-small);
  display: flex;
  flex-wrap: wrap;
  padding: 2.5px;
  place-content: center;
}
p {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  place-content: center;
  width: 60px;
  margin: 2.5px;
}
span {
  width: 50%;
}
span:nth-child(1) {
  margin-right: 2.5px;
  text-align: right;
}
span:nth-child(2) {
  margin-left: 2.5px;
}
</style>
