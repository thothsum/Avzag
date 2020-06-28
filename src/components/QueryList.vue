<template>
  <div id="root" class="container" dense>
    <button @click="reset">
      <span class="material-icons-outlined">clear</span>
    </button>
    <QueryParam :text="t" v-model="values[i]" :key="i" v-for="(t, i) in tags" />
  </div>
</template>

<script>
import QueryParam from "./QueryParam";

export default {
  name: "QueryList",
  components: {
    QueryParam
  },
  props: ["tags"],
  data() {
    return {
      values: []
    };
  },
  computed: {
    result() {
      return this.tags.reduce((q, t, i) => {
        if (this.values[i]) q[t] = this.values[i] > 0;
        return q;
      }, {});
    }
  },
  watch: {
    result: {
      handler() {
        this.$emit("query", this.result);
      },
      immediate: true
    },
    tags: {
      handler() {
        this.reset();
      },
      immediate: true
    }
  },
  methods: {
    reset() {
      this.values = new Array(this.tags.length).fill(0);
    }
  }
};
</script>

<style lang="scss" scoped>
#root {
  width: 100%;
  flex-wrap: nowrap;
  overflow-x: auto;
}
</style>
