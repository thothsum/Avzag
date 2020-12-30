/* eslint-disable vue/no-mutating-props */
<template>
  <ActionHeader icon="sticky_note_2" header="Notes" @action="add">
    <template #caption><slot /></template>
    <div v-for="(n, i) in notes" :key="i" class="row">
      <input v-model="notes[i]" type="text" />
      <Button icon="clear" @click="remove(i)" />
    </div>
  </ActionHeader>
</template>

<script>
import Button from "./Button";
import ActionHeader from "@/components/ActionHeader";

export default {
  name: "NotesEditor",
  components: {
    Button,
    ActionHeader,
  },
  props: ["notes"],
  watch: {
    notes: {
      handler() {
        this.$forceUpdate();
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    add() {
      if (this.notes) this.notes.push("");
      else this.$emit("update:notes", [""]);
    },
    remove(i) {
      this.$delete(this.notes, i);
    },
  },
};
</script>
