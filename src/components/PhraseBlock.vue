<template>
  <button
    class="small"
    :class="{
      'text-faded': variant.implicit,
      [colorClass]: dynamic,
    }"
    v-show="passed"
    @click="switchVariant"
  >
    <p>{{ variant.text }}</p>
  </button>
</template>

<script>
export default {
  name: "PhraseBlock",
  props: ["entities", "block", "showIpa"],
  model: {
    prop: "entities",
    event: "update",
  },
  data() {
    return {
      index: 0,
      switched: false,
    };
  },
  computed: {
    passed() {
      return (
        !this.block.conditions ||
        this.block.conditions.every((c) => this.hasTags(c.tags, c.entity))
      );
    },
    variants() {
      return this.block.variants;
    },
    variant() {
      return this.variants[this.index];
    },
    dynamic() {
      return !this.block.locked && this.variants.length > 1;
    },
    entity() {
      return this.block.entity;
    },
    colorClass() {
      return "colored-" + Object.keys(this.entities).indexOf(this.entity);
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
      if (!this.entity) return;
      if (this.switched) this.switched = false;
      else return;

      let ent = Object.assign({}, this.entities);
      vOld?.tags?.split(" ").forEach((t) => ent[this.entity].delete(t));
      vNew?.tags?.split(" ").forEach((t) => ent[this.entity].add(t));
      this.$emit("update", ent);
    },
  },
  methods: {
    switchVariant() {
      if (!this.dynamic) return;
      this.switched = true;
      this.index = (this.index + 1) % this.variants.length;
    },
    findVariant() {
      this.index = this.entity
        ? Math.max(
            this.variants.findIndex((v) => this.hasTags(v.tags, this.entity)),
            0
          )
        : 0;
    },
    hasTags(tags, entity) {
      return tags?.split(" ").every((t) => this.entities[entity].has(t));
    },
  },
};
</script>

<style lang="scss" scoped>
button:not([class*="colored-"]) {
  padding: 0;
  background-color: transparent;
  cursor: default;
}
</style>
