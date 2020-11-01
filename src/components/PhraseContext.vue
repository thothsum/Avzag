<template>
  <div class="panel-horizontal-dense wrap">
    <div
      class="panel-horizontal-dense text-caption text-faded text-dot context wrap"
      :key="e"
      v-for="(e, i) of entities"
    >
      <h2>{{ e }}<IndexedColor :indexes="[i]" /></h2>
      <p :key="t" v-for="t in tags[i]">{{ t }}</p>
    </div>
  </div>
</template>

<script>
import IndexedColor from "./IndexedColor";

export default {
  name: "PhraseContext",
  components: {
    IndexedColor,
  },
  props: ["context", "translation"],
  computed: {
    dictionary() {
      return (
        this.translation?.reduce((d, p) => {
          d[p[0]] = p[1];
          return d;
        }, {}) ?? {}
      );
    },
    entities() {
      return this.translate(Object.keys(this.context));
    },
    tags() {
      return Object.values(this.context).map((t) => this.translate([...t]));
    },
  },
  methods: {
    translate(values) {
      return values.map((v) => this.dictionary[v] ?? v);
    },
  },
};
</script>

<style lang="scss" scoped>
.context > * {
  position: relative;
  line-height: 150%;
}
</style>
