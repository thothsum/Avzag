<template>
  <button @click="toggle">
    <p class="icon" v-if="icon">{{icon}}</p>
    <p v-if="text">{{text}}</p>
  </button>
</template>

<script>
export default {
  name: "Toggle",
  props: ["icons", "text", "bool"],
  model: {
    prop: "bool",
    event: "toggle",
  },
  computed: {
    icon() {
      if (!this.icons) return null;
      return this.icons[this.bool && this.icons.length > 1 ? 1 : 0];
    },
  },
  methods: {
    toggle() {
      this.$emit("toggle", !this.bool);
    },
  },
};
</script>
