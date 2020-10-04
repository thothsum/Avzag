<template>
  <div v-show="passed" :class="{ 'text-faded': variant.implicit }">
    <p v-if="locked">{{ variant.text }}</p>
    <Select v-else :items="variants" itemKey="text" v-model="variant" />
  </div>
</template>

<script>
import Select from "./Select";

export default {
  name: "PhraseBlock",
  components: {
    Select,
  },
  props: ["entities", "block"],
  model: {
    prop: "entities",
    event: "update",
  },
  data() {
    return {
      variant: undefined,
      lastVariant: undefined,
    };
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
    locked() {
      return this.block.locked || this.variants.length == 1;
    },
  },
  watch: {
    passed() {
      if (this.passed) this.findVariant();
    },
    entities: {
      handler() {
        this.findVariant();
      },
      immediate: true,
    },
    variant(vNew, vOld) {
      let ent = Object.assign({}, this.entities);
      vOld?.tags?.split(" ").forEach((t) => ent[vOld.entity].delete(t));
      vNew?.tags?.split(" ").forEach((t) => ent[vNew.entity].add(t));
      this.$emit("update", ent);
    },
  },
  methods: {
    findVariant() {
      this.variant =
        this.variants.find((v) => this.hasTags(v.entity, v.tags)) ??
        this.variants[0];
    },
    hasTags(entity, tags) {
      return tags?.split(" ").every((t) => this.entities[entity].has(t));
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  line-height: 175%;
  text-align-last: center;
}
select {
  -moz-appearance: none;
  -webkit-appearance: none;
  user-select: text;
  min-height: min-content;
  min-width: min-content;
  padding-left: map-get($margins, "half");
  padding-right: map-get($margins, "half");
}
</style>
