<template>
  <div>
    <h2>{{phoneme.str}} • {{phoneme.ipa}}</h2>
    <p id="tags">{{phoneme.tags.reduce((a, t) => (a = `${a} ${t}`))}}</p>
    <div>
      <button
        class="sample"
        @click="play(i)"
        :key="i"
        v-for="(smp, i) in phoneme.samples"
        v-html="highlight(smp)"
      ></button>
    </div>
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
  methods: {
    highlight(sample) {
      const str = this.phoneme.str;
      return sample.replace(new RegExp(str, "g"), `<b>${str}</b>`);
    },
    play(i) {
      this.player.src = `${this.langRoot}audio/${this.phoneme.samples[i]}.m4a`;
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
}

h2 {
  word-spacing: 15px;
  margin-top: 0;
}

#tags {
  font-size: 12px;
  font-style: italic;
  word-spacing: 10px;
}

.sample {
  margin: 10px 0;
  width: 100%;
}
</style>
