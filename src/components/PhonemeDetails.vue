<template>
  <div id="root">
    <div class="card">
      <h2>[{{phoneme.ipa}}]</h2>
      <p class="note" id="features" v-if="features">{{features}}</p>
    </div>
    <audio ref="player"></audio>
    <template v-if="phoneme.lects">
      <div class="card" :key="i" v-for="(lect, i) in phoneme.lects">
        <p class="lect">
          {{lect.name}} —
          <b>{{lect.grapheme}}</b>
        </p>
        <div
          :style="{height: Math.min(3, lect.samples.length) * 25 + 'px' }"
          class="list"
          v-if="lect.samples && lect.samples.length>0"
        >
          <button
            @click="play(lect, i)"
            :key="i"
            v-html="highlight(sample, lect.grapheme)"
            v-for="(sample, i) in lect.samples"
          ></button>
        </div>
        <p class="note" v-if="lect.note">{{lect.note}}</p>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "PhonemeDetails",
  props: ["phoneme"],
  computed: {
    features() {
      return this.phoneme["features"]?.reduce((a, t) => (a = `${a} ${t}`));
    },
    root() {
      return this.$store.getters.languageRoot;
    }
  },
  methods: {
    highlight(sample, grapheme) {
      return sample.replace(new RegExp(grapheme, "g"), `<b>${grapheme}</b>`);
    },
    play(lect, i) {
      const player = this.$refs.player;
      player.src = `${this.root}${lect.name}/audio/${lect.samples[i]}.m4a`;
      player.play();
    }
  }
};
</script>

<style scoped>
.card {
  padding: 5px;
}
.card > * {
  margin: 0;
}
.card > *:not(:last-child) {
  margin-bottom: 5px;
}
.list {
  box-shadow: 0 0 5px 1px var(--shadow);
}
#root {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;
}
#header {
  display: flex;
  place-content: center;
}
h2 {
  margin: 0;
}
h2,
#features,
.lect {
  text-align: center;
}
#features {
  word-spacing: 10px;
}
.note,
#features {
  font-size: 12px;
  font-style: italic;
}
@media only screen and (max-width: 600px) {
  .card {
    width: 300px;
  }
}
</style>
