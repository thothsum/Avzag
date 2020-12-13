<template>
  <div v-if="any" class="row text-caption text-faded wrap">
    <template v-for="(ts, i) of tags" :key="i">
      <div v-if="ts.length" class="row wrap">
        <h2 :class="'colored-dot-' + i">{{ entities[i] }}</h2>
        <p v-for="t in ts" :key="t">{{ t }}</p>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'PhraseContext',
  props: ['context', 'translation', 'blocks'],
  computed: {
    dictionary () {
      const translation = { entities: {}, tags: {} }
      this.translation?.forEach(({ entity, tags }) => {
        translation.entities[entity[0]] = entity[1]
        translation.tags[entity[0]] =
          tags?.reduce((d, t) => {
            d[t[0]] = t[1]
            return d
          }, {}) ?? {}
      })
      return translation
    },
    explicitContext () {
      return (
        this.blocks
          ?.filter((b) => b.visible)
          .map((b) => [].concat(b?.requirements, b?.conditions))
          .flat()
          .filter((b) => b)
          .reduce((c, { entity, tag }) => {
            if (!c[entity]) c[entity] = new Set()
            c[entity].add(tag)
            return c
          }, {}) ?? {}
      )
    },
    entities () {
      return Object.keys(this.context).map((e) =>
        this.translate(this.dictionary.entities, e)
      )
    },
    tags () {
      return Object.entries(this.context).map(([e, ts]) =>
        [...(ts ?? [])]
          .filter((t) => !this.explicitContext[e]?.has(t))
          .map((t) => this.translate(this.dictionary.tags[e], t))
      )
    },
    any () {
      return this.tags.some((t) => t?.length)
    }
  },
  methods: {
    translate (d, k) {
      if (d) {
        const t = d[k]
        if (t) return t
      }
      return k
    }
  }
}
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
