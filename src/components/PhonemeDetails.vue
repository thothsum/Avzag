<template>
  <div id="root">
    <div class="card">
      <div id="header">
        <h2>{{phoneme.ipa}}</h2>
      </div>
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
  props: ["langRoot", "phoneme"],
  computed: {
    features: function() {
      return this.phoneme["features"]?.reduce((a, t) => (a = `${a} ${t}`));
    }
  },
  methods: {
    highlight(sample, grapheme) {
      return sample.replace(new RegExp(grapheme, "g"), `<b>${grapheme}</b>`);
    },
    play(lect, i) {
      const player = this.$refs.player;
      player.src = `${this.langRoot}${lect.name}/audio/${lect.samples[i]}.m4a`;
      player.play();
    }
  }
};
</script>

<style scoped>
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
  height: 25px;
}
h2 {
  margin: 0;
  height: 100%;
}
h2,
#features,
.lect {
  text-align: center;
}
#features {
  word-spacing: 10px;
}
.note {
  font-size: 12px;
  font-style: italic;
}
@media only screen and (max-width: 600px) {
  .card {
    width: 300px;
  }
}
</style>
