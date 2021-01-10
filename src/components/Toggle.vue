<template>
  <div @click="toggle">
    <slot :on="modelValue">
      <control
        v-bind="attrs"
        :icon="icon"
        :text="props.text"
        :is-on="modelValue"
      />
    </slot>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, defineEmit, defineProps } from "vue";

const props = defineProps({ modelValue: Boolean, icon: String, text: String });
const emit = defineEmit(["update:modelValue"]);
const attrs = useContext().attrs;

function toggle() {
  emit("update:modelValue", !props.modelValue);
}
</script>
