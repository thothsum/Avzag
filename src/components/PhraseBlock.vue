<template>
  <button
    class="small"
    :class="colorEntity"
    v-show="passed"
    @click="switchVariant"
  >
    <p :class="{ 'text-ipa': canShowIpa, 'text-faded': variant.implicit }">
      {{ display }}
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
    colorEntity() {
      return this.getEntityColor(this.locked ? "" : this.entity);
    },
    colorConditions() {
      return this.block.conditions?.map((c) => this.getEntityColor(c.entity));
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
