<template>
  <div @click="toggle">
    <slot :on="modelValue">
      <btn
        style="width: 100%"
        v-bind="attrs"
        :icon="icon"
        :text="text"
        :is-on="modelValue"
      />
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    modelValue: Boolean,
    icon: { type: String, default: "" },
    text: { type: String, default: "" },
  },
  emits: ["update:modelValue"],
  setup(props, { emit, attrs }) {
    function toggle() {
      emit("update:modelValue", !props.modelValue);
    }
    return { toggle, attrs };
  },
});
</script>
