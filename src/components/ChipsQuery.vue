<template>
  <div class="panel-horizontal-dense scroll" v-if="many">
    <button @click="reset" class="small icon-small round">clear</button>
    <button
      class="small round"
      :class="{'highlight-confirm': v, 'highlight-alert': !v}"
      @click="toggle(k)"
      :key="k"
      v-for="(k, v) of values"
    >{{k}}</button>
  </div>
</template>

<script>
export default {
  name: "ChipsQuery",
  props: ["query", "items", "itemKey"],
  model: {
    prop: "query",
    event: "update",
  },
  computed: {
    keys() {
      return this.itemKey
        ? this.items.map((it) => it[this.itemKey])
        : this.items;
    },
    many() {
      return this.keys.length > 1;
    },
  },
  watch: {
    items() {
      this.reset();
    },
    many(m) {
      if (!m) {
        let q = {};
        q[this.keys[0]] = true;
        this.$emit("update", q);
      }
    },
  },
  methods: {
    toggle(k) {
      let q = this.query;
      if (k in q) {
        if (q[k]) q[k] = false;
        else delete q[k];
      } else q[k] = true;
      this.$emit("update", q);
    },
    reset() {
      this.$emit("update", {});
    },
  },
};
</script>
