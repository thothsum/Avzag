<template>
  <div class="section" v-if="file">
    <div class="panel scroll">
      <div :key="t" v-for="t in types" class="panel">
        <h3>{{t}}</h3>
        <div class="table panel-horizontal-dense wrap">
          <PhoneticItem
            @click.native="selectPhoneme(t,p)"
            :selectedCopy="selectedCopy && selectedCopy.phoneme==p"
            :ipa="p"
            :str="Object.keys(u.samples)[0]"
            :key="p"
            v-for="(u, p) of file[t]"
          />
          <button class="add" @click="addPhoneme(t)">+</button>
        </div>
      </div>
    </div>
    <div class="card panel" v-if="selectedCopy">
      <button @click="deletePhoneme">delete</button>
      <button @click="applyPhoneme">apply</button>
      <input type="text" v-model="selectedCopy.phoneme" />
      <h3 v-if="selectedCopy.notes">Notes</h3>
      <textarea v-model="selectedCopy.notes[i]" :key="i" v-for="(n,i) in selectedCopy.notes" />
      <h3 v-if="selectedCopy.samples">Samples</h3>
      <div :key="g" v-for="(s, g) of selectedCopy.samples" class="panel">
        {{g}}
        <div :key="i" v-for="(w,i) in s" class="panel-dense">
          <input type="text" v-model="w.word" />
          <input type="text" v-model="w.ipa" />
          <div class="panel-horizontal">
            <input type="checkbox" v-model="w.muted" />muted
          </div>
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
      selectedType: null,
      selectedPhoneme: null,
      selectedCopy: null,
    };
  },
  computed: {
    text() {
      return JSON.stringify(this.file);
    },
  },
  watch: {
    selectedCopy(val) {
      let data = null;
      for (const t of this.types) {
        data = this.file[t][this.selectedCopy];
        if (data) {
          data.phoneme = val;
          break;
        }
      }
      this.selectedCopyData = data;
    },
    file() {
      this.$forceUpdate();
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
    selectPhoneme(t, p) {
      this.selectedType = t;
      this.selectedPhoneme = p;

      this.selectedCopy = JSON.parse(JSON.stringify(this.file[t][p]));
      this.selectedCopy.phoneme = p;
      this.selectedCopy.type = t;
    },
    addPhoneme(type) {
      if ("new" in this.file[type]) return;
      this.file[type]["new"] = { samples: { new: [] } };
    },
    deletePhoneme() {
      delete this.file[this.selectedCopy.type][this.selectedCopy.phoneme];
      this.selectedCopy = null;
    },
    applyPhoneme() {
      const t = this.selectedCopy.type;
      const p = this.selectedCopy.phoneme;
      delete this.selectedCopy.type;
      delete this.selectedCopy.phoneme;
      delete this.file[this.selectedType][this.selectedPhoneme];
      this.file[t][p] = JSON.parse(JSON.stringify(this.selectedCopy));
      this.selectPhoneme(t, p);
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
