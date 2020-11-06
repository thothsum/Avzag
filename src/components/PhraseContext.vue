<template>
  <div class="panel-horizontal-dense wrap" v-if="any">
    <div
      class="panel-horizontal-dense text-caption text-faded context wrap"
      :key="i"
      v-for="(e, i) of entities"
    >
      <h2 v-if="e">{{ e }}<IndexedColor :indexes="[i]" /></h2>
      <template v-for="(t, j) in tags[i]">
        <p v-if="t" :key="j">{{ t }}</p>
      </template>
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
      return this.translation?.reduce((d, p) => {
        d[p[0]] = p[1];
        return d;
      }, {});
    },
    entities() {
      return this.translate(Object.keys(this.context));
    },
    tags() {
      return Object.values(this.context).map((t) => this.translate([...t]));
    },
    any() {
      return (
        this.entities?.some((e) => e) ||
        this.tags?.some((t) => t.some((t) => t))
      );
    },
  },
  methods: {
    translate(values) {
      return this.dictionary
        ? values.map((v) => this.dictionary[v] ?? "")
        : values;
    },
  },
};
</script>

<style lang="scss" scoped>
.context > * {
  position: relative;
  line-height: 150%;
}
h2:after {
  content: ":";
}
p::after {
  content: ",";
}
p:last-child::after {
  content: ".";
}
</style>
