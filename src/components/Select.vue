<template>
  <select v-model="index">
    <option :value="i" :key="i" v-for="(k, i) in keys">{{k}}</option>
  </select>
</template>

<script>
export default {
  name: "Select",
  props: ["value", "items", "itemKey"],
  model: {
    prop: "value",
    event: "select",
  },
  data() {
    return {
      index: 0,
    };
  },
  computed: {
    keys() {
      return this.itemKey
        ? this.items.map((it) => it[this.itemKey])
        : this.items;
    },
  },
  watch: {
    value: {
      handler(v) {
        const i = this.items.indexOf(v);
        this.index = i < 0 ? 0 : i;
      },
      immediate: true,
    },
    index: {
      handler(i) {
        this.$emit("select", this.items[i]);
      },
      immediate: true,
    },
  },
};
</script>
