<template>
  <div id="root">
    <div class="card">
      <div id="header">
        <h2>[{{phoneme.ipa}}]</h2>
      </div>
      <div>
        <p class="note" id="features" v-if="features">{{features}}</p>
      </div>
    </div>
    <audio ref="player"></audio>
    <template v-if="phoneme.lects">
      <div class="card" :key="i" v-for="(lect, i) in phoneme.lects">
        <div>
          <p class="lect">
            {{lect.name}} —
            <b>{{lect.grapheme}}</b>
          </p>
        </div>
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
        <div class="note" v-if="lect.note">
          <p>{{lect.note}}</p>
        </div>
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
  padding: 0;
}
.card > div {
  border-radius: 0;
  margin: 0;
  padding: 5px;
}
.card > div > * {
  margin: 0;
}
.card > div:first-child {
  box-shadow: 0 2px 4px 0 var(--shadow);
}
.card > div:nth-child(3) {
  box-shadow: 0 -2px 4px 0 var(--shadow);
}
.card > div:last-child {
  border-radius: 0 0 4px 4px;
}
.list {
  padding: 0 !important;
  border-radius: 0;
  box-shadow: none;
}
#root {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;
}
#root > *:first-child {
  margin-top: 0;
}
#root > *:last-child {
  margin-bottom: 0;
}
#header {
  display: flex;
  place-content: center;
  /* height: 25px; */
}
h2 {
  margin: 0;
  /* height: 100%; */
}
h2,
#features,
.lect {
  text-align: center;
}
#features {
  word-spacing: 10px;
}
.note > p, #features {
  font-size: 12px;
  font-style: italic;
}
@media only screen and (max-width: 600px) {
  .card {
    width: 300px;
  }
}
</style>
