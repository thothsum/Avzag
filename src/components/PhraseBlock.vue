<template>
  <div v-if="passed">
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
  props: ["entities", "block"],
  data() {
    return {
      variant: undefined,
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
  },
  watch: {
    entities() {
      console.log("changed");
    },
    block() {
      this.variant =
        this.variants.find((v) => this.hasTags(v.entity, v.tags)) ??
        this.variants[0];
    },
    variant(vNew, vOld) {
      this.$emit("update", vNew, vOld);
    },
  },
  methods: {
    hasTags(entity, tags) {
      return tags.split(" ").every((t) => this.entities[entity].has(t));
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
  color: var(--color-highlight);
}
</style>
