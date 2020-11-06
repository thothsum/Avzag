<template>
  <div class="panel-dense">
    <h2 class="panel-horizontal-dense">
      <p class="icon">sticky_note_2</p>
      Notes
    </h2>
    <p v-if="caption" class="text-caption text-faded">{{ caption }}</p>
    <div class="panel-horizontal-dense" :key="i" v-for="(n, i) in notes">
      <input type="text" v-model="notes[i]" class="flex" />
      <Button @click.native="remove(i)" icon="clear" />
    </div>
    <Button class="center" @click.native="add" icon="add" />
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
