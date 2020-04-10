<template>
  <div id="root">
    <div class="card">
      <div id="header">
        <h2>{{phoneme.ipa}}</h2>
      </div>
      <p id="features" v-if="features">{{features}}</p>
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
            class="flat"
            @click="play(lect, i)"
            :key="i"
            v-html="highlight(sample, lect.grapheme)"
            v-for="(sample, i) in lect.samples"
          ></button>
        </div>
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
#header {
  display: flex;
  place-content: center;
  height: 25px;
  margin-bottom: 0;
}
h2 {
  margin: 0;
  height: 100%;
}
p,
h2 {
  text-align: center;
}
p#features {
  font-size: 12px;
  font-style: italic;
  word-spacing: 10px;
  margin: 0;
}
.card {
  width: 100%;
  margin: 5px 0 5px 0;
  box-shadow: 0px 0px 10px var(--shadow);
  padding: 5px;
  display: flex;
  flex-direction: column;
  background-color: white;
}
.card > * {
  margin: 2.5px 0;
}
.card > *:first-child {
  margin-top: 0;
}
.card > *:last-child {
  margin-bottom: 0;
}
@media only screen and (max-width: 600px) {
  .card {
    width: 300px;
  }
}
</style>
