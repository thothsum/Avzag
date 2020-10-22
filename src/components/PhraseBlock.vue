<template>
  <button
    class="small"
    :class="{ [colorClass]: this.entity }"
    v-show="passed"
    @click="switchVariant"
  >
    <p :class="{ 'text-ipa': canShowIpa, 'text-faded': variant.implicit }">
      {{ canShowIpa ? variant.ipa : variant.text }}
    </p>
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
    variants() {
      return this.block.variants;
    },
    entity() {
      return this.block.entity;
    },
    colorClass() {
      return "colored-" + Object.keys(this.entities).indexOf(this.entity);
    },
    canShowIpa() {
      return this.showIpa && this.variant.ipa;
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
        if (!this.entity) return;
        if (vNew && !vOld && this.passed) {
          let ent = Object.assign({}, this.entities);
          vNew?.tags?.split(" ").forEach((t) => ent[this.entity].add(t));
          this.$emit("update", ent);
          return;
        }
        if (this.switched) this.switched = false;
        else return;

        if (vOld.text == "вянилдай") console.log("old " + vOld.tags);
        if (vNew.text == "вянилдай") console.log("new " + vNew.tags);

        let ent = Object.assign({}, this.entities);
        vOld?.tags?.split(" ").forEach((t) => ent[this.entity].delete(t));
        vNew?.tags?.split(" ").forEach((t) => ent[this.entity].add(t));
        this.$emit("update", ent);
      },
      immediate: true,
    },
  },
  methods: {
    switchVariant() {
      if (!this.entity) return;
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
button:not([class*="colored-"]) {
  padding: 0;
  background-color: transparent;
  justify-items: center;
  cursor: default;
}
</style>
