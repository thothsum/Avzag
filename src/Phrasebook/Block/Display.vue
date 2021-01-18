<template>
  <div>
    <p
      v-for="(t, i) in types"
      :key="i"
      :class="{ 'text-faded': state.implicit, 'text-ipa': t === 'ipa', t }"
    >
      <span v-for="(s, j) in segments[i]" :key="j" :class="segmentColors[j]">
        {{ s }}
      </span>
    </p>
    <div class="row line">
      <p v-for="(c, i) in dashColors" :key="i" class="dash" :class="c" />
    </div>
  </div>
</template>

<script>
export default {
  name: "PhraseStateDisplay",
  inject: ["context"],
  props: {
    state: { type: Object, default: () => ({}) },
    glossed: { type: Boolean, default: false },
  },
  computed: {
    entities() {
      return Object.keys(this.context.value);
    },
    types() {
      return this.glossed ? ["ipa", "glossing"] : ["text"];
    },
    segmentColors() {
      return this.state.display.map(
        (d) => "colored-" + this.entities.indexOf(d.entity)
      );
    },
    dashColors() {
      if (!this.state.transition || !this.state.conditions) return [];
      const set = new Set(
        this.state.conditions
          .filter(({ passive }) => !passive)
          .map((c) => c.entity)
      );
      return [...set]
        .map((e) => this.entities.indexOf(e))
        .map((i) => "colored-back-" + i);
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
.line {
  overflow: hidden;
  border-radius: 0 0 $border-radius $border-radius;
  height: $border-radius;
  width: 100%;
  left: 0;
  justify-content: center;
  position: absolute;
  bottom: 0;
  .dash {
    height: 100%;
    width: 4 * $border-radius;
  }
}
</style>
