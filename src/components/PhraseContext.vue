<template>
  <div class="panel-horizontal-dense text-caption wrap" v-if="any">
    <template v-for="(ts, i) of tags">
      <div class="panel-horizontal-dense wrap" :key="i" v-if="ts.length">
        <h2 :class="'colored-dot-' + i">{{ entities[i] }}</h2>
        <p :key="t" v-for="t in ts">{{ t }}</p>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "PhraseContext",
  props: ["context", "translation", "blocks"],
  computed: {
    dictionary() {
      return this.translation?.reduce((d, [e, t]) => {
        d[e] = t;
        return d;
      }, {});
    },
    explicitContext() {
      return (
        this.blocks
          ?.filter((b) => b.visible)
          .map((b) => [].concat(b?.requirements, b?.conditions))
          .flat()
          .filter((b) => b)
          .reduce((c, { entity, tag }) => {
            if (!c[entity]) c[entity] = new Set();
            c[entity].add(tag);
            return c;
          }, {}) ?? {}
      );
    },
    entities() {
      return this.translate(Object.keys(this.context));
    },
    tags() {
      return Object.entries(this.context)
        .map(([e, ts]) =>
          [...ts].filter((t) => !this.explicitContext[e]?.has(t))
        )
        .map((t) => this.translate(t));
    },
    any() {
      return this.tags.some((t) => t.length);
    },
  },
  methods: {
    translate(values) {
      return this.dictionary
        ? values.map((v) => this.dictionary[v] ?? "").filter((v) => v)
        : values;
    },
  },
};
</script>

<style lang="scss" scoped>
h2::after {
  content: ":";
}
p::after {
  content: ",";
}
p:last-child::after {
  content: ".";
}
</style>
