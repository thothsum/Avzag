<template>
  <div class="card">
    <h3>{{lect}}</h3>
    <div class="text">
      <template v-for="(s, i) in source">
        <pre v-if="typeof s === 'string'" :key="i">{{s}}</pre>
        <pre v-else-if="s.implicit" :key="i">{{s.values[selectedIds[s.id]]}}</pre>
        <select v-else :key="i" v-model="selectedIds[s.id]">
          <option :value="j" :key="j" v-for="(v, j) in s.values">{{v}}</option>
        </select>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "PhrasebookEntry",
  props: ["lect", "source", "selectedIds"],
  model: {
    prop: "selectedIds",
    event: "update",
  },
};
</script>

<style lang="scss" scoped>
.text {
  display: flex;
  flex-wrap: wrap;
}
select {
  -moz-appearance: none;
  -webkit-appearance: none;
  text-align-last: center;
  height: min-content;
  width: min-content;
  min-height: min-content;
  min-width: min-content;
  margin: {
    left: map-get($margins, "half");
    right: map-get($margins, "half");
  }
}
.card {
  height: min-content;
  display: grid;
  gap: map-get($margins, "normal");
  grid-template-columns: 100px 1fr;
  box-shadow: map-get($shadows, "normal");
}
@media only screen and (max-width: $mobile-width) {
  .card {
    grid-template-columns: 1fr;
    gap: 0;
  }
}
</style>
