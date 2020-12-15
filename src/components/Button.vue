<template>
  <button :class="{ highlight: value }" @click="toggle">
    <p v-if="icon" class="icon">{{ icon }}</p>
    <p v-if="text">{{ text }}</p>
  </button>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    value: Boolean,
    icon: { type: String, default: "" },
    text: { type: String, default: "" },
  },
  emits: ["update:value"],
  setup(props, { emit }) {
    const toggle = () => emit("update:value", !props.value);
    return { toggle };
  },
});
</script>
