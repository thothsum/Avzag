<template>
  <div class="panel-horizontal-dense scroll">
    <button @click="reset" class="small icon-small round">clear</button>
    <button
      class="small round"
      :class="{'highlight-confirm': value[i]===1, 'highlight-alert': value[i]===-1}"
      @click="update(i)"
      :key="i"
      v-for="i in items"
    >{{i}}</button>
  </div>
</template>

<script>
export default {
  name: "ChipsQuery",
  props: ["value", "items"],
  model: {
    prop: "value",
    event: "update",
  },
  computed: {
    result() {
      return this.tags.reduce((q, t, i) => {
        if (this.values[i]) q[t] = this.values[i] > 0;
        return q;
      }, {});
    },
  },
  watch: {
    result: {
      handler() {
        this.$emit("query", this.result);
      },
      immediate: true,
    },
    tags: {
      handler() {
        this.reset();
      },
      immediate: true,
    },
  },
  methods: {
    update(i) {
      this.value[i] = ((this.value[i] + 2) % 3) - 1;
      this.$emit("update", this.value);
    },
    reset() {
      this.values = new Array(this.tags.length).fill(0);
    },
  },
};
</script>
