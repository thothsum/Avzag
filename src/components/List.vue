<template>
  <div class="panel-solid">
    <Button
      :key="i"
      v-for="(v, i) in values"
      :text="text[i]"
      :class="{ highlight: value == v }"
      @click.native="select(v)"
    />
  </div>
</template>

<script>
import Button from "./Button";

export default {
  name: "List",
  components: {
    Button,
  },
  props: ["value", "items", "indexed", "display"],
  computed: {
    text() {
      return this.display ? this.items.map((i) => i[this.display]) : this.items;
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
