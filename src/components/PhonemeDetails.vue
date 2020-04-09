<template>
  <div id="card">
    <h2>{{phoneme.ipa}}</h2>
    <p v-if="features">{{features}}</p>
    <template v-if="phoneme.lects">
      <hr />
      <div :key="i" v-for="(lect, i) in phoneme.lects">
        <h3>{{lect.name}}: {{lect.grapheme}}</h3>
        <template v-if="lect.samples && lect.samples.length>0">
          <button
            @click="play(lect, i)"
            :key="i"
            v-html="highlight(sample, lect.grapheme)"
            v-for="(sample, i) in lect.samples"
          ></button>
        </template>
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
h2 {
  word-spacing: 15px;
  margin-top: 0;
}
p {
  font-size: 12px;
  font-style: italic;
  word-spacing: 10px;
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
