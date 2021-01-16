<template>
  <EditorCard :icon="icon" :header="header" @action="add">
    <template #caption><slot /></template>
    <div class="scroll col">
      <div v-for="(c, i) in conditions" :key="i" class="row">
        <toggle v-if="allowPassive" v-model="c.passive" icon="call_missed" />
        <select v-model="c.entity">
          <option v-for="e in entities" :key="e" :value="e" />
        </select>
        <p class="icon">west</p>
        <select v-model="c.tag" v-if="c.entity">
          <option
            v-for="t in [...contextSource[c.entity]]"
            :key="t"
            :value="t"
          />
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
  props: ["modelValue", "allowPassive", "header", "icon"],
  inject: ["contextSource"],
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
  },
  methods: {
    add() {
      if (!this.conditions) this.conditions = [];
      this.conditions.push({});
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
