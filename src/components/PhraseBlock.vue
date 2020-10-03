<template>
  <div v-show="passed">
    <p v-if="variants.length == 1">{{ variant.text }}</p>
    <Select :items="variants" itemKey="text" v-model="variant" />
  </div>
</template>

<script>
import Select from "./Select";

export default {
  name: "PhraseBlock",
  components: {
    Select,
  },
  data() {
    return {
      variant: undefined,
    };
  },
  props: ["entities", "block"],
  model: {
    prop: "entities",
    event: "switch",
  },
  computed: {
    passed() {
      return (
        !this.block.conditions ||
        this.block.conditions.every((c) => this.hasTags(c.entity, c.tags))
      );
    },
    variants() {
      return this.block.variants;
    },
  },
  watch: {
    block() {
      this.variant =
        this.variants.find((v) => this.hasTags(v.entity, v.tags)) ??
        this.variants[0];
    },
    variant(vNew, vOld) {
      let ent = this.entities;
      vOld?.tags.split(" ").forEach((t) => ent[vOld.entity].delete(t));
      vNew.tags.split(" ").forEach((t) => ent[vNew.entity].add(t));
      this.$emit("switch", ent);
    },
  },
  methods: {
    hasTags(entity, tags) {
      return tags.split(" ").every((t) => this.entities[entity].includes(t));
    },
  },
};
</script>

<style lang="scss" scoped>
div * {
  line-height: 175%;
}
select {
  -moz-appearance: none;
  -webkit-appearance: none;
  user-select: text;
  min-height: min-content;
  min-width: min-content;
  padding: 0;
  color: var(--color-highlight);
}
</style>
