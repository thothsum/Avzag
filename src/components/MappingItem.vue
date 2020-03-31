<template>
  <p>
    <span :key="i" v-for="(s, i) in mapping">{{s.replace(" ", "_")}}</span>
  </p>
</template>

<script>
export default {
  name: "MappingItem",
  props: ["mapping"]
};
</script>

<style scoped>
* {
  font-size: 12px;
  font-family: "Fira Sans", sans-serif;
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
