<template>
  <div
    v-show="passed"
    :class="({ 'text-faded': variant.implicit }, 'colored-' + entityIndex)"
  >
    <p v-if="locked">{{ variant.text }}</p>
    <Button v-else :text="variant.text" @click.native="switchVariant" />
  </div>
</template>

<script>
import Button from "./Button";

export default {
  name: "PhraseBlock",
  components: {
    Button,
  },
  props: ["entities", "block"],
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
    locked() {
      return this.block.locked || this.variants.length == 1;
    },
    entity() {
      return this.block.entity;
    },
    entityIndex() {
      return Object.keys(this.entities).indexOf(this.entity);
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
button {
  line-height: 175%;
  min-height: min-content;
  min-width: min-content;
}
</style>
