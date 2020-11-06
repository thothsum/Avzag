<template>
  <button @click="toggle" :class="{ highlight: value }">
    <p v-if="icon" class="icon">{{ icon }}</p>
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
