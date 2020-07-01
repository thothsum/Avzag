<template>
  <div class="panel-dense card">
    <p>
      <b>{{use.grapheme}}</b>
      — {{lect}}
    </p>
    <p class="text-caption text-faded" v-if="use.note">{{use.note}}</p>
    <div
      :style="{height: Math.min(3, use.samples.length) * 24 + 'px' }"
      class="list"
      v-if="use.samples && use.samples.length>0"
    >
      <button @click="$emit('play', sm)" :key="i" v-for="(sm, i) in use.samples">
        <span class="icon-small">play_arrow</span>
        <span v-html="highlight(sm, use.grapheme)"></span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PhonemeUse",
  props: ["lect", "use"],
  methods: {
    highlight(sample, grapheme) {
      return sample.replace(
        new RegExp(grapheme, "g"),
        `<span style="color: var(--color-highlight)">${grapheme}</span>`
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.list {
  margin: -1 * map-get($margins, "double");
  margin-top: map-get($margins, "half");
  border-top-right-radius: 0;
  border-top-left-radius: 0;
}
</style>
