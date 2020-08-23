<template>
  <div class="section panel" v-if="file">
    <div :key="t" v-for="t in types" class="panel">
      <div :key="p" v-for="(u, p) of file[t]">
        <h2>{{p}}</h2>
        <h3 v-if="u.notes">Notes</h3>
        <p :key="i" v-for="(n,i) in u.notes">{{n}}</p>
        <h3 v-if="u.samples">Samples</h3>
        <div :key="g" v-for="(s, g) of u.samples" class="panel-horizontal">
          {{g}}
          <div :key="i" v-for="(w,i) in s">
            <p>{{w.word}}</p>
            <p>{{w.ipa}}</p>
            <p>{{w.muted ? 1 : 0}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PhonologyEditor",
  data() {
    return {
      types: ["vowels", "consonants"],
      file: null,
    };
  },
  computed: {
    text() {
      return JSON.stringify(this.file);
    },
  },
  async mounted() {
    const r = this.$store.state.root;
    const l = this.$route.query.lect;
    this.file = await fetch(`${r}${l}/phonemes.json`).then((r) => r.json());
  },
};
</script>

<style lang="scss" scoped>
</style>
