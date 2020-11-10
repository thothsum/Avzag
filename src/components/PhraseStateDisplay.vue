<template>
  <p class="panel-horizontal-solid" v-if="display">
    <span :class="colors[i]" :key="i" v-for="(d, i) in display">
      {{ d[0] }}
    </span>
  </p>
</template>

<script>
export default {
  name: "PhraseStateDisplay",
  props: ["display", "context", "monochrome"],
  computed: {
    entities() {
      return Object.keys(this.context);
    },
    colors() {
      return this.monochrome
        ? []
        : this.display.map((d) => "colored-" + this.entities.indexOf(d[1]));
    },
    text() {
      return this.display.map((d) => d[0]).join(" ");
    },
  },
};
</script>
