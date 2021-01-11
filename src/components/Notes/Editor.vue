<template>
  <EditorCard icon="sticky_note_2" header="Notes" @action="add">
    <template #caption><slot /></template>
    <div v-for="(n, i) in notes" :key="i" class="row">
      <input v-model="notes[i]" type="text" />
      <control icon="clear" @click="remove(i)" />
    </div>
  </EditorCard>
</template>

<script lang="ts">
import { PropType, computed, defineComponent } from "vue";
import EditorCard from "@/components/EditorCard.vue";

export default defineComponent({
  components: { EditorCard },
  props: {
    modelValue: { type: Array as PropType<string[]>, default: null },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
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

    return { notes, add, remove };
  },
});
</script>
