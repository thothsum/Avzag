<template>
  <ActionHeader @action="add" icon="sticky_note_2" header="Notes">
    <template #caption><slot /></template>
    <div class="panel-horizontal-dense" :key="i" v-for="(n, i) in notes">
      <input type="text" v-model="notes[i]" class="flex" />
      <Button @click.native="remove(i)" icon="clear" />
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
