<template>
  <div class="card">
    <p>
      <b>{{use.grapheme}}</b>
      — {{lect}}
    </p>
    <p class="txt-caption txt-faded" v-if="use.note">{{use.note}}</p>
    <div
      :style="{height: Math.min(3, use.samples.length) * 24 + 'px' }"
      class="list"
      v-if="use.samples && use.samples.length>0"
    >
      <button @click="$emit('play', sm)" :key="i" v-for="(sm, i) in use.samples">
        <span class="material-icons-outlined">play_arrow</span>
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
      return sample.replace(new RegExp(grapheme, "g"), `<b>${grapheme}</b>`);
    }
  }
};
</script>

<style scoped>
.card > .list {
  margin: calc(var(--margin) * -1);
  margin-top: var(--margin);
  border-top-right-radius: 0;
  border-top-left-radius: 0;
}
</style>
