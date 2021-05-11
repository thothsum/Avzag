<template>
  <EditorCard icon="sticky_note_2" header="Notes">
    <template #header>
      <ArrayControl v-model="notes" :add="''" />
    </template>
    <div v-for="(n, i) in notes" :key="i" class="row">
      <input v-model="notes[i]" type="text" :placeholder="'note #' + i" />
      <btn icon="clear" @click="notes.splice(i, 1)" />
    </div>
  </EditorCard>
</template>

<script lang="ts">
import { PropType, computed, defineComponent } from "vue";

export default defineComponent({
  name: "NotesEditor",
  props: {
    modelValue: { type: Array as PropType<string[]>, default: undefined },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const notes = computed({
      get: () => props.modelValue,
      set: (n) => emit("update:modelValue", n),
    });
    return { notes };
  },
});
</script>
