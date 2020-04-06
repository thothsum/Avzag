<template>
  <div id="card">
    <h2>{{phoneme.str}} • {{phoneme.ipa}}</h2>
    <hr />
    <h4>Features</h4>
    <p>{{reduceTags('tags')}}</p>
    <template v-if="idioms">
      <h4>Idioms</h4>
      <p>{{reduceTags('idioms')}}</p>
    </template>
    <template v-if="phoneme.samples && phoneme.samples.length>0">
      <h4>Samples</h4>
      <button
        @click="play(i)"
        :key="i"
        v-for="(smp, i) in phoneme.samples"
        v-html="highlight(smp)"
      ></button>
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
      return this.reduceTags("tags");
    },
    idioms: function() {
      return this.reduceTags("idioms");
    }
  },
  methods: {
    highlight(sample) {
      const str = this.phoneme.str;
      return sample.replace(new RegExp(str, "g"), `<b>${str}</b>`);
    },
    play(i) {
      this.player.src = `${this.langRoot}audio/${this.phoneme.samples[i]}.m4a`;
      this.player.play();
    },
    reduceTags(key) {
      return this.phoneme[key]?.reduce((a, t) => (a = `${a} ${t}`));
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
  padding: 10px;
  box-shadow: 0px 0px 10px var(--nord4);
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
@media only screen and (max-width: 600px) {
  #card {
    width: 300px;
  }
}
</style>
