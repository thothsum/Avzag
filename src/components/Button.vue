<template>
  <button @click="toggle" :class="{ highlight: value }">
    <p class="icon" v-if="icon">{{ icon }}</p>
    <p v-if="text">{{ text }}</p>
  </button>
</template>

<script>
export default {
  name: "Button",
  props: ["value", "icon", "text"],
  methods: {
    toggle() {
      this.$emit("update:value", !this.value);
    },
  },
};
</script>
