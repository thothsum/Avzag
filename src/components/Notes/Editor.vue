<template>
  <ActionHeader icon="sticky_note_2" header="Notes" @action="add">
    <template #caption><slot /></template>
    <div v-for="(n, i) in modelValue" :key="i" class="row">
      <p>{{ n }}</p>
      <!-- <input v-model="modelValue[i]" type="text" /> -->
      <button class="icon" @click="remove(i)">clear</button>
    </div>
  </ActionHeader>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import { computed, defineEmit, defineProps, PropType } from "vue";
import ActionHeader from "@/components/ActionHeader";

const props = defineProps({
  modelValue: Array as PropType<string[]>,
  default: [],
});
const emit = defineEmit(["update:modelValue"]);

const add = () => {
  const t = props.modelValue ?? [];
  t.push("");
  emit("update:modelValue", t);
};

const remove = (i: number) => {
  const t = props.modelValue ?? [];
  t.splice(i, 1);
  emit("update:modelValue", t);
};
</script>
