<template>
  <EditorCard :icon="icon" :header="header" @action="add">
    <template #caption><slot /></template>
    <div class="scroll col">
      <div v-for="(c, i) in conditions" :key="i" class="row">
        <toggle v-if="allowPassive" v-model="c.passive" icon="call_missed" />
        <Select v-model:value="c.entity" :items="entities" />
        <p class="icon">west</p>
        <Select
          v-if="contextSource[c.entity]"
          v-model:value="c.tag"
          :items="contextSource[c.entity]"
        />
        <btn icon="clear" @click="remove(i)" />
      </div>
    </div>
  </EditorCard>
</template>

<script>
import EditorCard from "@/components/EditorCard";
import Select from "@/components/Select";

export default {
  name: "PhraseConditionsEditor",
  components: {
    EditorCard,
    Select,
  },
  props: ["conditions", "allowPassive", "header", "icon"],
  inject: ["contextSource"],
  computed: {
    entities() {
      return Object.keys(this.contextSource);
    },
  },
  methods: {
    add() {
      let c = this.conditions;
      if (!c) this.$emit("update:conditions", (c = []));
      c.push({});
    },
    remove(i) {
      this.$delete(this.conditions, i);
    },
  },
};
</script>

<style lang="scss" scoped>
.scroll {
  max-height: 128px;
}
</style>
