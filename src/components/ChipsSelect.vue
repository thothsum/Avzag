<template>
  <div class="panel-horizontal-dense scroll">
    <button
      class="small round"
      :class="{'highlight': value==items[i]}"
      @click="select(i)"
      :key="k"
      v-for="(k, i) in keys"
    >{{k}}</button>
  </div>
</template>

<script>
export default {
  name: "ChipsSelect",
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
  watch: {
    value: {
      handler() {
        if (!this.value) this.select(0);
      },
      immediate: true,
    },
  },
  methods: {
    select(i) {
      this.$emit("select", this.items[i]);
    },
  },
};
</script>
