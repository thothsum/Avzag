<template>
  <div class="panel-dense">
    <div class="panel-horizontal-dense">
      <h2 class="flex">Notes</h2>
      <Button @click.native="addNote" icon="add" />
    </div>
    <p v-if="caption" class="text-caption text-faded">{{ caption }}</p>
    <div class="panel-horizontal-dense" :key="i" v-for="(n, i) in notes">
      <input type="text" v-model="notes[i]" class="flex" />
      <Button @click.native="deleteNote(i)" icon="clear" />
    </div>
  </div>
</template>

<script>
import Button from "./Button";

export default {
  name: "NotesEditor",
  components: {
    Button,
  },
  props: ["notes", "caption"],
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
    addNote() {
      if (this.notes) this.notes.push("");
      else this.$emit("update:notes", [""]);
    },
    deleteNote(i) {
      this.$delete(this.notes, i);
    },
  },
};
</script>
