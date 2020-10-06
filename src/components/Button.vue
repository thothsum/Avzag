<template>
  <button @click="toggle" :class="{ highlight: bool }">
    <p class="icon" v-if="icon">{{ icon }}</p>
    <p v-if="text">{{ text }}</p>
  </button>
</template>

<script>
export default {
  name: "Button",
  props: ["icon", "text", "bool"],
  model: {
    prop: "bool",
    event: "toggle",
  },
  methods: {
    toggle() {
      this.$emit("toggle", !this.bool);
    },
  },
};
</script>
