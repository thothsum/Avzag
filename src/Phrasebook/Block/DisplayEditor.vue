<template>
  <EditorCard icon="visibility" header="display" @action="add">
    <template #header>
      <toggle v-model="state.implicit" icon="opacity" />
    </template>
    <div v-if="display" class="col">
      <div v-for="(d, i) in display" :key="i" class="row">
        <btn icon="palette" @click="toggle(i)" />
        <input
          v-model="d.text"
          :class="colors[i]"
          type="text"
          placeholder="text"
        />
        <input
          v-model="d.ipa"
          class="text-ipa"
          :class="colors[i]"
          type="text"
          placeholder="ipa"
        />
        <input
          v-model="d.glossing"
          class="glossing"
          :class="colors[i]"
          type="text"
          placeholder="glossing"
        />
        <btn icon="clear" @click="remove(i)" />
      </div>
    </div>
  </EditorCard>
</template>

<script>
/* eslint-disable vue/no-mutating-props */
import EditorCard from "@/components/EditorCard";

export default {
  name: "PhraseStateDisplayEditor",
  components: {
    EditorCard,
  },
  props: ["state", "allowEmpty"],
  inject: ["contextSource"],
  computed: {
    display() {
      return this.state.display;
    },
    entities() {
      return [undefined].concat(Object.keys(this.contextSource.value));
    },
    colors() {
      return this.state.display?.map(
        (d) => "colored-" + (this.entities.indexOf(d.entity) - 1)
      );
    },
  },
  methods: {
    add() {
      if (this.display) this.display.push({});
      else this.$set(this.state, "display", [{}]);
    },
    toggle(j) {
      let i = this.entities.indexOf(this.display[j].entity);
      i = (i + 1) % this.entities.length;
      this.$set(this.display[j], "entity", this.entities[i]);
    },
    remove(i) {
      if (this.allowEmpty || this.display.length > 1) {
        this.$delete(this.display, i);
      }
    },
  },
};
</script>
