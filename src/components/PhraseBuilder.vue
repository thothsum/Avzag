<template>
  <div class="panel-horizontal-solid">
    <span
      :key="i"
      v-for="(s, i) in source"
      :class="{left: s.align=='left', right: s.align=='right'}"
    >
      <pre v-if="typeof s === 'string'">{{s}}</pre>
      <pre v-else-if="s.implicit">{{s.values[ids[s.id]]}}</pre>
      <select class="inline" v-model="ids[s.id]" v-else>
        <option :value="j" :key="j" v-for="(v, j) in s.values">{{v}}</option>
      </select>
    </span>
  </div>
</template>

<script>
export default {
  name: "PhraseBuilder",
  props: ["source", "ids"],
};
</script>

<style lang="scss" scoped>
div {
  flex-wrap: wrap;
}
select {
  -moz-appearance: none;
  -webkit-appearance: none;
  user-select: text;
  min-height: min-content;
  min-width: min-content;
  padding: 0;
  color: var(--color-highlight);
}
span {
  text-align-last: center;
  &.left {
    text-align-last: left;
  }
  &.right {
    text-align-last: right;
  }
}
</style>
