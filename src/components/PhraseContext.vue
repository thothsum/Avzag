<template>
  <div class="panel-horizontal-dense wrap">
    <div
      class="panel-horizontal-dense text-caption text-faded context wrap"
      :key="e"
      v-for="(e, i) of entities"
    >
      <h2>{{ e }}:<IndexedColor :indexes="[i]" /></h2>
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
  },
  methods: {
    translate(values) {
      return this.dictionary
        ? values
            .filter((v) => v in this.dictionary)
            .map((v) => this.dictionary[v])
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
p:not(:last-child)::after {
  content: ",";
}
p:last-child::after {
  content: ".";
}
</style>
