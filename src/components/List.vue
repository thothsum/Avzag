<template>
  <div class="col-0">
    <btn
      v-for="(v, i) in values"
      :key="i"
      :text="text[i]"
      :class="{ highlight: value == v }"
      @click="select(v)"
    />
  </div>
</template>

<script>
export default {
  name: "List",
  props: ["value", "items", "indexed", "display"],
  computed: {
    text() {
      return this.display
        ? typeof this.display === "object"
          ? this.display
          : this.items.map((i) => i[this.display])
        : this.items;
    },
    values() {
      return this.indexed ? this.items.map((_, i) => i) : this.items;
    },
  },
  watch: {
    items: {
      handler() {
        if (this.items && !this.value) this.select(this.values[0]);
      },
      immediate: true,
    },
  },

  methods: {
    select(v) {
      this.$emit("update:value", v);
    },
  },
};
</script>
