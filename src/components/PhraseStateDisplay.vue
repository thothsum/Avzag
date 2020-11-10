<template>
  <p
    :class="{ implicit, 'text-ipa': type == 'ipa' }"
    class="panel-horizontal-solid"
    v-if="state"
  >
    <span :class="colors[i]" :key="i" v-for="(s, i) in segments">
      {{ s }}
    </span>
  </p>
</template>

<script>
export default {
  name: "PhraseStateDisplay",
  props: {
    state: { type: Object },
    type: { type: String, default: "text" },
    context: { type: Object },
    colored: { type: Boolean, default: true },
  },
  computed: {
    implicit() {
      return this.type == "text" && this.state.implicit;
    },
    entities() {
      return Object.keys(this.context);
    },
    colors() {
      return this.colored
        ? []
        : this.state.display.map(
            (d) => "colored-" + this.entities.indexOf(d.entity)
          );
    },
    segments() {
      return this.state.display.map((d) => d[this.type]);
    },
    text() {
      return this.segments.join(" ");
    },
  },
};
</script>

<style lang="scss" scoped>
.implicit {
  opacity: 65%;
}
</style>
