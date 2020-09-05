<template>
  <div class="panel-horizontal-dense scroll">
    <button
      class="small round"
      :class="{'highlight': value==it}"
      @click="select(it)"
      :key="it"
      v-for="it in items"
    >{{it}}</button>
  </div>
</template>

<script>
export default {
  name: "ChipsSelect",
  props: ["value", "items"],
  model: {
    prop: "value",
    event: "select",
  },
  watch: {
    value: {
      handler() {
        if (!this.value) this.select(this.items[0]);
      },
      immediate: true,
    },
  },
  methods: {
    select(it) {
      this.$emit("select", it);
    },
  },
};
</script>
