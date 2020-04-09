<template>
  <div id="card">
    <div id="header">
      <h2>{{`[ ${phoneme.ipa} ]`}}</h2>
    </div>
    <p v-if="features">{{features}}</p>
    <template v-if="phoneme.lects">
      <hr />
      <div :key="i" v-for="(lect, i) in phoneme.lects">
        <p class="lect">
          {{lect.name}} —
          <span class="grapheme">{{lect.grapheme}}</span>
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
  data() {
    return {
      player: new Audio()
    };
  },
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
      this.player.src = `${this.langRoot}${lect.name}/audio/${lect.samples[i]}.m4a`;
      this.player.play();
    }
  },
  created() {
    this.player.play();
  }
};
</script>

<style scoped>
* {
  text-align: center;
  margin: 10px 0;
  width: 100%;
}
#card {
  margin: auto;
  padding: 10px;
  box-shadow: 0px 0px 10px var(--shadow);
  width: 200px;
  justify-self: center;
}
#header {
  display: flex;
  place-content: center;
  height: 25px;
  margin-bottom: 0;
}
.grapheme {
  font-style: normal;
  font-weight: bold;
}
h2 {
  margin: 0;
  height: 100%;
}
p {
  font-size: 12px;
  font-style: italic;
  word-spacing: 10px;
}
p.lect {
  text-align: left;
}
button:last-child {
  margin-bottom: 0;
}
@media only screen and (max-width: 600px) {
  #card {
    width: 300px;
  }
}
</style>
