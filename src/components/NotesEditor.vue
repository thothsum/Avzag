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
export default {
  name: "NotesEditor",
  props: ["notes", "caption"],
  methods: {
    addNote() {},
  },
};
</script>
