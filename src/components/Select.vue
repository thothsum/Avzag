<template>
  <select @change="select($event.target.value)">
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
  computed: {
    keys() {
      return this.itemKey
        ? this.items.map((it) => it[this.itemKey])
        : this.items;
    },
  },
  mounted() {
    let i = this.items.indexOf(this.value);
    if (i < 0) i = 0;
    this.$el.value = i;
  },
  methods: {
    select(i) {
      this.$emit("select", this.items[i]);
    },
  },
};
</script>
