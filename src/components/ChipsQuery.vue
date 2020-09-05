<template>
  <div class="panel-horizontal-dense scroll">
    <button @click="reset" class="small icon-small round">clear</button>
    <button
      class="small round"
      :class="{'highlight-confirm': v>0, 'highlight-alert': v<0}"
      @click="toggle(i)"
      :key="i"
      v-for="(v, i) in values"
    >{{items[i]}}</button>
  </div>
</template>

<script>
export default {
  name: "ChipsQuery",
  props: ["items"],
  data() {
    return {
      values: [],
    };
  },
  watch: {
    values: {
      handler(val) {
        this.$emit(
          "query",
          val.reduce((q, v, i) => {
            if (v) q[this.items[i]] = v > 0;
            return q;
          }, {})
        );
      },
    },
    items: {
      handler() {
        this.reset();
      },
      immediate: true,
    },
  },
  methods: {
    toggle(i) {
      this.values.splice(i, 1, ((this.values[i] + 2) % 3) - 1);
    },
    reset() {
      this.values = new Array(this.items.length).fill(0);
    },
  },
};
</script>
