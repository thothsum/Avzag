<template>
  <div class="panel-horizontal-dense scroll">
    <button
      class="small round"
      :class="{'highlight': value==i}"
      @click="update(i)"
      :key="i"
      v-for="i in items"
    >{{i}}</button>
  </div>
</template>

<script>
export default {
  name: "ChipsSelect",
  props: ["value", "items"],
  model: {
    prop: "value",
    event: "update",
  },
  watch: {
    value: {
      handler() {
        if (!this.value) this.update(this.items[0]);
      },
      immediate: true,
    },
  },
  methods: {
    update(i) {
      this.$emit("update", i);
    },
  },
};
</script>
