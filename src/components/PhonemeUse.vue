<template>
  <div class="panel card">
    <div class="title">
      <h3>{{lect}}</h3>
      <p v-html="graphemes"></p>
    </div>
    <div class="panel-solid scroll">
      <template v-for="(u, j) in use.samples">
        <button
          class="small panel-horizontal"
          @click="$emit('play', s[0])"
          :key="j*10+i"
          v-for="(s, i) in u.samples"
        >
          <span v-if="!s['muted']" class="icon-small">play_arrow</span>
          <span class="text" v-html="highlight(s['word'], u.grapheme, s['highlights'])"></span>
          <span class="text-ipa" v-if="s[1]" v-html="highlight(s['ipa'], phoneme)"></span>
        </button>
      </template>
    </div>
    <PhoneticNote :key="i" v-for="(n, i) in use.notes" :text="n" />
  </div>
</template>

<script>
import PhoneticNote from "./PhoneticNote";

export default {
  name: "PhonemeUse",
  components: { PhoneticNote },
  props: ["phoneme", "lect", "use", "notes"],
  computed: {
    graphemes() {
      return this.use.samples
        .map((u) => `<b>${u.grapheme}</b>`)
        .join("<span class='text-dot'></span>");
    },
  },
  methods: {
    highlight(sample, grapheme, indexes) {
      const regex = new RegExp(grapheme, "g");
      const match = `<span style="color: var(--color-highlight)">${grapheme}</span>`;

      if (indexes) {
        let i = 0;
        return sample.replace(regex, function (m) {
          return indexes.includes(i++) ? match : m;
        });
      }
      return sample.replace(regex, match);
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: space-between;
}
.panel-solid {
  $margin: -1 * map-get($margins, "normal");
  margin-left: $margin;
  margin-right: $margin;
  border-radius: 0;
  max-height: 3 * map-get($button-height, "normal");
  &:last-child {
    margin-bottom: $margin;
    border-radius: 0 0 $border-radius $border-radius;
  }
}
.text {
  flex: 1;
  text-align: left;
}
</style>
