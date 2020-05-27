<template>
  <div id="mapping">
    <p :key="i" v-for="(pair, i) in noones">
      <span :key="j" v-for="(s, j) in pair">{{s.replace(" ", "_")}}</span>
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
* {
  font-size: 12px;
}
#mapping {
  box-shadow: 0 0 10px var(--shadow);
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  place-content: center;
}
p {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  place-content: center;
  width: 70px;
  margin: 5px;
}
span:nth-child(1) {
  width: 50%;
  margin-right: 5px;
  text-align: right;
  font-weight: 300;
}
span:nth-child(2) {
  font-weight: 500;
  width: 50%;
  margin-left: 5px;
  text-align: left;
}
</style>
