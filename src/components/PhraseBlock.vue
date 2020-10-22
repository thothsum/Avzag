<template>
  <button
    class="small"
    :class="colorEntity"
    v-show="passed"
    @click="switchVariant"
  >
    <p :class="{ 'text-ipa': canShowIpa, 'text-faded': variant.implicit }">
      {{ canShowIpa ? variant.ipa : variant.text }}
    </p>
    <div
      v-if="interactive && colorConditions"
      class="conditions panel-horizontal-dense"
    >
      <p :class="c" :key="i" v-for="(c, i) in colorConditions" />
    </div>
  </button>
</template>

<script>
export default {
  name: "PhraseBlock",
  props: ["entities", "block", "interactive", "phonemic"],
  model: {
    prop: "entities",
    event: "update",
  },
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
        this.block.conditions.every((c) => this.hasTags(c.tags, c.entity))
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
    colorEntity() {
      return this.getEntityColor(this.locked ? "" : this.entity);
    },
    colorConditions() {
      return this.block.conditions?.map((c) => this.getEntityColor(c.entity));
    },
    canShowIpa() {
      return this.phonemic && this.variant.ipa;
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
          this.$emit("update", ent);
          return;
        }
        if (this.switched) this.switched = false;
        else return;

        let ent = Object.assign({}, this.entities);
        vOld?.tags?.split(" ").forEach((t) => ent[this.entity].delete(t));
        vNew?.tags?.split(" ").forEach((t) => ent[this.entity].add(t));
        this.$emit("update", ent);
      },
      immediate: true,
    },
  },
  methods: {
    getEntityColor(entity) {
      return "colored-" + Object.keys(this.entities).indexOf(entity);
    },
    switchVariant() {
      if (this.locked) return;
      const i = this.variants.indexOf(this.variant);
      this.variant = this.variants[(i + 1) % this.variants.length];
      this.switched = true;
    },
    findVariant() {
      this.variant =
        this.variants.find((v) => this.hasTags(v.tags, this.entity)) ??
        this.variants[0];
    },
    hasTags(tags, entity) {
      return tags?.split(" ").every((t) => this.entities[entity].has(t));
    },
  },
};
</script>

<style lang="scss" scoped>
.colored--1 {
  padding: 0;
  background-color: transparent;
  cursor: default;
  &:hover,
  &:active {
    background-color: transparent;
  }
}
button {
  position: relative;
}
.conditions {
  width: 100%;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  * {
    width: 4 * $border-radius;
  }
}
</style>
