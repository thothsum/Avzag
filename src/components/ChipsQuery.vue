<template>
  <div class="panel-horizontal-dense scroll" v-if="many">
    <button @click="reset" class="small icon-small round">clear</button>
    <button
      class="small round"
      :class="highlights[i]"
      @click="toggle(i)"
      :key="k"
      v-for="(k, i) in keys"
    >
      {{ k }}
    </button>
  </div>
</template>

<script>
export default {
  name: "ChipsQuery",
  props: ["items", "itemKey"],
  data() {
    return {
      input: [],
    };
  },
  computed: {
    keys() {
      return this.itemKey
        ? this.items.map((it) => it[this.itemKey])
        : this.items;
    },
    highlights() {
      return this.input.map((i) =>
        i ? (i > 0 ? "highlight-confirm" : "highlight-alert") : null
      );
    },
    many() {
      return this.keys.length > 1;
    },
  },
  watch: {
    items() {
      this.reset();
    },
    many: {
      handler() {
        if (!this.many) {
          this.$emit("query", { [this.keys[0]]: 1 });
        }
      },
      immediate: true,
    },
    input(input) {
      this.$emit(
        "query",
        input.reduce((q, inp, i) => {
          if (inp) q[this.keys[i]] = inp > 0;
          return q;
        }, {})
      );
    },
  },
  methods: {
    toggle(i) {
      this.$set(this.input, i, ((this.input[i] + 2) % 3) - 1);
    },
    reset() {
      this.input = new Array(this.keys.length).fill(0);
    },
  },
};
</script>
