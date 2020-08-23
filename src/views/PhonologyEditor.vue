<template>
  <div class="section" v-if="file">
    <div class="panel scroll">
      <div :key="t" v-for="t in types" class="panel">
        <h3>{{t}}</h3>
        <div class="table panel-horizontal-dense wrap">
          <PhoneticItem
            @click.native="selected=p"
            :selected="selected==p"
            :ipa="p"
            :str="Object.keys(u.samples)[0]"
            :key="p"
            v-for="(u, p) of file[t]"
          />
          <!-- <h2>{{p}}</h2>
        <h3 v-if="u.notes">Notes</h3>
        <p :key="i" v-for="(n,i) in u.notes">{{n}}</p>
        <h3 v-if="u.samples">Samples</h3>
        <div :key="g" v-for="(s, g) of u.samples" class="panel-horizontal">
          {{g}}
          <div :key="i" v-for="(w,i) in s">
            <input type="text" v-model="w.word" />
            <input type="text" v-model="w.ipa" />
            <input type="checkbox" v-model="w.muted" />
          </div>
          </div>-->
          <button class="add" @click="addPhoneme(t)">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PhoneticItem from "@/components/PhoneticItem";

export default {
  name: "PhonologyEditor",
  components: {
    PhoneticItem,
  },
  data() {
    return {
      types: ["vowels", "consonants"],
      file: null,
      selected: null,
    };
  },
  computed: {
    text() {
      return JSON.stringify(this.file);
    },
  },
  async mounted() {
    const l = this.$route.query.lect;
    if (!l) {
      this.file = {};
      return;
    }
    const r = this.$store.state.root;
    this.file = await fetch(`${r}${l}/phonemes.json`).then((r) => r.json());
  },
  methods: {
    addPhoneme(type) {
      this.file[type]["new"] = { samples: { new: [] } };
      this.$forceUpdate();
    },
  },
};
</script>

<style lang="scss" scoped>
.section {
  display: grid;
  grid-template-columns: 1fr 224px;
  gap: map-get($margins, "double");
}
button.add {
  font-size: map-get($font-sizes, "title");
  color: var(--color-highlight);
  height: 40px;
}
input[type="text"] {
  height: map-get($button-height, "small");
}
</style>
