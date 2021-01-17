<template>
  <EditorCard icon="visibility" header="display" @action="add">
    <template #header>
      <toggle
        icon="opacity"
        :model-value="implicit"
        @update:modelValue="$emit('update:implicit', $event)"
      />
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
import EditorCard from "@/components/EditorCard";

export default {
  name: "PhraseStateDisplayEditor",
  components: {
    EditorCard,
  },
  inject: ["contextSource"],
  props: ["modelValue", "implicit", "allowEmpty"],
  emits: ["update:modelValue", "update:implicit"],
  computed: {
    display: {
      get() {
        return this.modelValue;
      },
      set(d) {
        this.$emit("update:modelValue", d);
      },
    },
    entities() {
      return [undefined].concat(Object.keys(this.contextSource.value));
    },
    colors() {
      return this.display.map(
        (d) => "colored-" + (this.entities.indexOf(d.entity) - 1)
      );
    },
  },
  methods: {
    add() {
      if (!this.display) this.display = [];
      this.display.push({});
    },
    toggle(j) {
      let i = this.entities.indexOf(this.display[j].entity);
      i = (i + 1) % this.entities.length;
      this.display[j].entity = this.entities[i];
    },
    remove(i) {
      if (this.allowEmpty || this.display.length > 1) {
        this.display.splice(i, 1);
      }
    },
  },
};
</script>
