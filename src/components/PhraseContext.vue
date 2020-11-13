<template>
  <div class="panel-horizontal-dense text-caption text-faded wrap" v-if="any">
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
      let translation = { entities: {}, tags: [] };
      this.translation?.reduce((c, { entity, tags }) => {
        c.entities[entity[0]] = entity[1];
        c.tags.push(
          tags.reduce((d, t) => {
            d[t[0]] = t[1];
            return d;
          }, {})
        );
        return c;
      }, translation);
      return translation;
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
      return Object.keys(this.context).map((e) =>
        this.translate(this.dictionary.entities, e)
      );
    },
    tags() {
      return Object.entries(this.context)
        .map(([e, ts]) =>
          [...ts].filter((t) => !this.explicitContext[e]?.has(t))
        )
        .map((ts, i) =>
          ts.map((t) => this.translate(this.dictionary.tags[i], t))
        );
    },
    any() {
      return this.tags.some((t) => t.length);
    },
  },
  methods: {
    translate(d, k) {
      if (d) {
        const t = d[k];
        if (t) return t;
      }
      return k;
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
