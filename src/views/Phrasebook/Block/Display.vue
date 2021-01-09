<template>
  <div>
    <p
      v-for="(t, i) in types"
      :key="i"
      :class="{ 'text-faded': state.implicit, 'text-ipa': t == 'ipa', t }"
    >
      <span v-for="(s, j) in segments[i]" :key="j" :class="colors[j]">
        {{ s }}
      </span>
    </p>
  </div>
</template>

<script>
export default {
  name: "PhraseStateDisplay",
  props: {
    state: { type: Object },
    glossed: { type: Boolean, default: false },
    context: { type: Object },
    colored: { type: Boolean, default: true },
  },
  computed: {
    entities() {
      return Object.keys(this.context);
    },
    types() {
      return this.glossed ? ["ipa", "glossing"] : ["text"];
    },
    colors() {
      return this.colored
        ? this.state.display.map(
            (d) => "colored-" + this.entities.indexOf(d.entity)
          )
        : [];
    },
    segments() {
      return this.types.map((t) => this.state.display.map((d) => d[t]));
    },
    text() {
      const texts = this.segments.map((s) => s.join(""));
      return texts.length === 1 ? texts[0] : texts.join("\n");
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  display: flex;
  gap: 0;
}
</style>
