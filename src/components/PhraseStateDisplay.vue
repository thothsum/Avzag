<template>
  <p class="panel-horizontal-solid" v-if="display">
    <span :class="colors[i]" :key="i" v-for="(s, i) in segments">
      {{ s }}
    </span>
  </p>
</template>

<script>
export default {
  name: "PhraseStateDisplay",
  props: {
    display: { type: Array },
    type: { type: String, default: "text" },
    context: { type: Object },
    colored: { type: Boolean, default: true },
    glossing: { type: Boolean },
  },
  computed: {
    entities() {
      return Object.keys(this.context);
    },
    colors() {
      return this.colored
        ? []
        : this.display.map((d) => "colored-" + this.entities.indexOf(d.entity));
    },
    segments() {
      return this.display.map((d) => d[this.type]);
    },
    text() {
      return this.segments.join(" ");
    },
  },
};
</script>
