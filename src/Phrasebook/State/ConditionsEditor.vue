<template>
  <EditorCard :icon="icon" :header="header" @action="add">
    <template #caption><slot /></template>
    <div class="scroll col">
      <div v-for="(c, i) in conditions" :key="i" class="row">
        <toggle v-if="allowPassive" v-model="c.passive" icon="call_missed" />
        <select v-model="c.entity" @change="setEntity(c)">
          <option v-for="e in entities" :key="e" :value="e">{{ e }}</option>
        </select>
        <p class="icon">west</p>
        <select v-if="c.entity" v-model="c.tag">
          <option v-for="t in tags[c.entity]" :key="t" :value="t">
            {{ t }}
          </option>
        </select>
        <btn icon="clear" @click="remove(i)" />
      </div>
    </div>
  </EditorCard>
</template>

<script>
import EditorCard from "@/components/EditorCard";

export default {
  name: "PhraseConditionsEditor",
  components: { EditorCard },
  inject: ["contextSource"],
  props: ["modelValue", "allowPassive", "header", "icon"],
  emits: ["update:modelValue"],
  computed: {
    conditions: {
      get() {
        return this.modelValue;
      },
      set(c) {
        this.$emit("update:modelValue", c);
      },
    },
    entities() {
      return Object.keys(this.contextSource.value);
    },
    tags() {
      return Object.entries(this.contextSource.value).reduce(
        (c, [entity, tags]) => {
          c[entity] = [...tags];
          return c;
        },
        {}
      );
    },
  },
  methods: {
    setEntity(c) {
      c.tag = this.tags[c.entity][0];
    },
    add() {
      const condition = { entity: this.entities[0] };
      this.setEntity(condition);
      const conditions = this.conditions ?? [];
      conditions.push(condition);
      this.conditions = conditions;
    },
    remove(i) {
      this.conditions.splice(i, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.scroll {
  max-height: 128px;
}
</style>
