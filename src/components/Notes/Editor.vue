<template>
  <ActionHeader icon="sticky_note_2" header="Notes" @action="add">
    <template #caption><slot /></template>
    <div v-for="(n, i) in notes" :key="i" class="row">
      <input v-model="notes[i]" type="text" />
      <control icon="clear" @click="remove(i)" />
    </div>
  </ActionHeader>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import { PropType, computed, defineEmit, defineProps } from "vue";
import ActionHeader from "@/components/ActionHeader";

const props = defineProps({
  modelValue: Array as PropType<string[]>,
  default: [],
});
const emit = defineEmit(["update:modelValue"]);

const notes = computed({
  get: () => props.modelValue,
  set: (n) => emit("update:modelValue", n),
});

function add() {
  if (notes.value) notes.value.push("");
  else notes.value = [""];
}
function remove(i: number) {
  if (notes.value) notes.value.splice(i, 1);
}
</script>
