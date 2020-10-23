<template>
  <button
    class="small"
    :disabled="locked"
    v-show="passed"
    @click="switchVariant"
  >
    <template v-if="interactive">
      <IndexedColor :indexes="indexEntity" />
      <IndexedColor :indexes="indexConditions" />
    </template>
    <p :class="{ 'text-ipa': canShowIpa, 'text-faded': variant.implicit }">
      {{ display }}
    </p>
  </button>
</template>

<script>
import IndexedColor from "./IndexedColor";

export default {
  name: "PhraseBlock",
  components: {
    IndexedColor,
  },
  props: ["entities", "block", "interactive", "phonemic"],
  data() {
    return {
      switched: false,
      variant: undefined,
    };
  },
  computed: {
    passed() {
      return (
        !this.block.conditions ||
        this.block.conditions.every((c) => this.hasTags(c.tags, c.entity)[0])
      );
    },
    locked() {
      return !(this.interactive && this.entity);
    },
    variants() {
      return this.block.variants;
    },
    entity() {
      return this.block.entity;
    },
    indexEntity() {
      return this.getEntityIndex(this.locked ? "" : this.entity);
    },
    indexConditions() {
      return this.block.conditions?.map((c) => this.getEntityIndex(c.entity));
    },
    canShowIpa() {
      return this.phonemic && this.variant.ipa;
    },
    display() {
      return this.canShowIpa ? this.variant.ipa : this.variant.text;
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
    variant: {
      handler(vNew, vOld) {
        if (this.locked) return;
        if (vNew && !vOld && this.passed) {
          let ent = Object.assign({}, this.entities);
          vNew?.tags?.split(" ").forEach((t) => ent[this.entity].add(t));
          this.$emit("update:entities", ent);
          return;
        }
        if (this.switched) this.switched = false;
        else return;

        let ent = Object.assign({}, this.entities);
        vOld?.tags?.split(" ").forEach((t) => ent[this.entity].delete(t));
        vNew?.tags?.split(" ").forEach((t) => ent[this.entity].add(t));
        this.$emit("update:entities", ent);
      },
      immediate: true,
    },
  },
  methods: {
    getEntityIndex(entity) {
      const i = Object.keys(this.entities).indexOf(entity);
      return i >= 0 ? i : null;
    },
    switchVariant() {
      const i = this.variants.indexOf(this.variant);
      this.variant = this.variants[(i + 1) % this.variants.length];
      this.switched = true;
    },
    findVariant() {
      let bestV = this.variants[0];
      let bestL = 0;
      this.variants.forEach((v) => {
        const [p, l] = this.hasTags(v.tags, this.entity);
        if (p && l > bestL) {
          bestV = v;
          bestL = l;
        }
      });
      this.variant = bestV;
    },
    hasTags(tags, entity) {
      if (!tags) return [false, 0];
      tags = tags.split(" ");
      const len = tags.length;
      const fit = tags.filter((t) => this.entities[entity].has(t)).length;
      return [fit / len == 1, len];
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  position: relative;
}
:disabled {
  padding: 0;
  background-color: transparent;
  cursor: default;
  p:not(.text-faded) {
    color: var(--color-text);
  }
  &:hover,
  &:active {
    background-color: transparent;
  }
}
</style>
