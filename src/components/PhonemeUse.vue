<template>
  <div class="panel card">
    <div class="title">
      <h3>{{lect}}</h3>
      <p v-html="graphemes"></p>
    </div>
    <div class="panel-solid scroll">
      <template v-for="(c, j) in cases">
        <button
          class="small panel-horizontal"
          @click="$emit('play', s[0])"
          :key="j*10+i"
          v-for="(s, i) in c.samples"
        >
          <span v-if="s[0][0]!='*'" class="icon-small">play_arrow</span>
          <span class="text" v-html="highlight(s[0], c.grapheme, s[2])"></span>
          <span class="text-ipa" v-if="s[1]" v-html="highlight(s[1], phoneme)"></span>
        </button>
      </template>
    </div>
    <PhoneticNote :key="i" v-for="(n, i) in notes" :text="n" />
  </div>
</template>

<script>
import PhoneticNote from "./PhoneticNote";

export default {
  name: "PhonemeUse",
  components: { PhoneticNote },
  props: ["phoneme", "lect", "cases"],
  computed: {
    graphemes() {
      return this.cases
        .map((u) => `<b>${u.grapheme}</b>`)
        .join("<span class='text-dot'></span>");
    },
    notes() {
      return this.cases.map((u) => u.note).filter((n) => n);
    },
  },
  methods: {
    highlight(sample, grapheme, indexes) {
      if (sample[0] == "*") sample = sample.substr(1);
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
