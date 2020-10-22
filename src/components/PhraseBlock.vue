<template>
  <button
    class="small"
    :class="{
      'text-ipa': showIpa && variant.ipa,
      'text-faded': variant.implicit,
      [colorClass]: dynamic,
    }"
    v-show="passed"
    v-text="display"
    @click="switchVariant"
  />
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
    dynamic() {
      return !this.block.locked && this.variants.length > 1;
    },
    entity() {
      return this.block.entity;
    },
    colorClass() {
      return "colored-" + Object.keys(this.entities).indexOf(this.entity);
    },
    display() {
      return this.showIpa
        ? this.variant.ipa ?? this.variant.text
        : this.variant.text;
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
        if (vNew && !vOld && this.passed) {
          let ent = Object.assign({}, this.entities);
          vNew?.tags?.split(" ").forEach((t) => ent[this.entity].add(t));
          this.$emit("update", ent);
          return;
        }
        if (!this.entity) return;
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
      if (!this.dynamic) return;
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
  cursor: default;
}
</style>
