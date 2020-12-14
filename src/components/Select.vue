<template>
  <select v-model="index">
    <option v-for="(t, i) in text" :key="i" :value="i">{{ t }}</option>
  </select>
</template>

<script>
export default {
  name: "Select",
  props: ["value", "items", "display", "indexed"],
  data() {
    return {
      index: 0,
    };
  },
  computed: {
    text() {
      return this.display ? this.items.map((i) => i[this.display]) : this.items;
    },
    values() {
      return this.indexed ? this.items.map((_, i) => i) : this.items;
    },
  },
  watch: {
    value: {
      handler(v) {
        const i = this.values?.indexOf(v) ?? 0;
        this.index = i < 0 ? 0 : i;
      },
      immediate: true,
    },
    index: {
      handler(i) {
        this.$emit("update:value", this.values[i]);
      },
      immediate: true,
    },
  },
};
</script>
