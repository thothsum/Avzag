<template>
  <div id="root">
    <div class="card">
      <h1>
        <span class="txt-faded">/</span>
        {{phoneme.ipa}}
        <span class="txt-faded">/</span>
      </h1>
      <p class="txt-caption txt-faded" id="features" v-if="features">{{features}}</p>
    </div>
    <audio ref="player"></audio>
    <template v-if="phoneme.lects">
      <div class="card" :key="i" v-for="(lect, i) in phoneme.lects">
        <p>
          <span class="txt-faded">⟨</span>
          <b> {{lect.grapheme}} </b>
          <span class="txt-faded">⟩</span>
          ― {{lect.name}}
        </p>
        <p class="txt-caption txt-faded" v-if="lect.note">{{lect.note}}</p>
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
      return sample.replace(new RegExp(grapheme, "g"), `<u>${grapheme}</u>`);
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
#root {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;
}
#features {
  word-spacing: 10px;
}
</style>
