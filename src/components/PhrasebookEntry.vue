<template>
  <div class="card">
    <h3>{{lect}}</h3>
    <p class="text">
      <span
        :key="i"
        v-for="(s, i) in source"
        :class="{left: s.align=='left', right: s.align=='right'}"
      >
        <pre v-if="typeof s === 'string'">{{s}}</pre>
        <pre v-else-if="s.implicit">{{s.values[selectedIds[s.id]]}}</pre>
        <select class="inline" v-else v-model="selectedIds[s.id]">
          <option :value="j" :key="j" v-for="(v, j) in s.values">{{v}}</option>
        </select>
      </span>
    </p>
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
span {
  &.left {
    text-align-last: left;
  }
  &.right {
    text-align-last: right;
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
