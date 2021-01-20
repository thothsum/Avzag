<template>
  <div class="display row" :class="{ glossed: canGloss }">
    <div class="segments" :class="{ 'text-faded': state.implicit }">
      <p v-for="(t, i) in types" :key="i" :class="{ 'text-ipa': t === 'ipa' }">
        <span v-for="(s, j) in segments[i]" :key="j" :class="segmentColors[j]">
          {{ s }}
        </span>
      </p>
    </div>
    <div class="row dashes">
      <p v-for="(c, i) in dashColors" :key="i" :class="c" />
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
  emits: ["text"],
  computed: {
    entities() {
      return Object.keys(this.context.value);
    },
    canGloss() {
      return (
        this.glossed && this.state.display.some((s) => s.ipa || s.glossing)
      );
    },
    types() {
      return this.canGloss ? ["ipa", "glossing"] : ["text"];
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
  },
  watch: {
    segments(segments) {
      const texts = segments.map((s) => s.join(""));
      const text = texts.length === 1 ? texts[0] : texts.join("\n");
      this.$emit("text", text);
    },
  },
};
</script>

<style lang="scss" scoped>
.display {
  height: map-get($button-height, "small");
  position: relative;
  &.glossed {
    height: map-get($button-height, "normal") + map-get($margins, "normal");
  }
}
.segments {
  display: flex;
  flex-direction: column;
  p {
    display: flex;
    place-content: center;
  }
}
.dashes {
  overflow: hidden;
  border-radius: 0 0 $border-radius $border-radius;
  height: $border-radius;
  width: 100%;
  left: 0;
  justify-content: center;
  position: absolute;
  bottom: 0;
  > * {
    height: 100%;
    width: 4 * $border-radius;
  }
}
</style>
