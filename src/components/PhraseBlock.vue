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
  model: {
    prop: "entities",
    event: "update",
  },
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
      let entities = Object.assign({}, this.entities);

      if (vOld) {
        let eOld = vOld.entity;
        let tOld = new Set(this.entities[eOld]);
        vOld.tags.split(" ").forEach((t) => tOld.delete(t));
        Object.assign(entities, { [eOld]: tOld });
      }

      let eNew = vNew.entity;
      let tNew = this.entities[eNew];
      vNew.tags.split(" ").forEach((t) => tNew.add(t));
      Object.assign(entities, { [eNew]: tNew });

      this.$emit("update", entities);
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
