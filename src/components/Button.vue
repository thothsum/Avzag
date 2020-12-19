<template>
  <button :class="{ highlight }" @click="toggle">
    <p v-if="icon" class="icon">{{ icon }}</p>
    <p v-if="text">{{ text }}</p>
  </button>
</template>

<script>
import { defineComponent, computed } from "vue";

export default defineComponent({
  props: {
    modelValue: Boolean,
    icon: { type: String, default: "" },
    text: { type: String, default: "" },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const highlight = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });
    const toggle = () => (highlight.value = !highlight.value);
    return {
      highlight,
      toggle,
    };
  },
});
</script>
