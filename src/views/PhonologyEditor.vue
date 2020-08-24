<template>
  <div class="section" v-if="file">
    <div class="panel scroll">
      <div :key="t" v-for="t in types" class="panel">
        <h3>{{t}}</h3>
        <div class="table panel-horizontal-dense wrap">
          <PhoneticItem
            @click.native="selectPhoneme(t,p)"
            :selected="selectedPhoneme==p"
            :ipa="p"
            :str="u.samples && u.samples[0] ? u.samples[0].grapheme : null"
            :key="p"
            v-for="(u,p) of file[t]"
          />
          <button class="add icon" @click="addPhoneme(t)">add</button>
        </div>
      </div>
    </div>
    <div class="panel" v-if="selectedCopy">
      <div class="panel-horizontal-dense card">
        <h3>Phoneme</h3>
        <input type="text" v-model="selectedCopy.phoneme" />
        <button @click="deletePhoneme" class="small">delete</button>
        <button @click="submitPhoneme" class="small">submit</button>
      </div>
      <div class="panel card">
        <div class="panel-horizontal-dense">
          <h3>Notes</h3>
          <button @click="addNote" class="icon add small">add</button>
        </div>
        <div :key="i" v-for="(n,i) in selectedCopy.notes" class="edit">
          <textarea v-model="selectedCopy.notes[i]" class="flex" />
          <button @click="deleteNote(i)" class="icon delete small">delete</button>
        </div>
      </div>
      <div class="panel card">
        <div class="panel-horizontal-dense">
          <div class="sample">
            <h3>Samples</h3>
            <p>word</p>
            <p>ipa</p>
          </div>
          <button @click="addSample" class="icon add small">add</button>
        </div>
        <div :key="i" v-for="(s,i) in selectedCopy.samples" class="panel-dense edit">
          <div class="sample">
            <input type="text" v-model="s.grapheme" />
            <input type="text" v-model="s.word" />
            <input type="text" v-model="s.ipa" />
          </div>
          <button @click="deleteSample(i)" class="icon delete small">delete</button>
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
      file: {},
      selectedType: null,
      selectedPhoneme: null,
      selectedCopy: null,
    };
  },
  computed: {
    text() {
      return JSON.stringify(this.file);
    },
    phonemes() {
      let phonemes = {};
      for (const t of this.types) phonemes[t] = Object.keys(this.file[t]);
      return phonemes;
    },
    graphemes() {
      let graphemes = {};
      this.types.forEach(
        (t) =>
          (graphemes[t] = this.phonemes[t].map(
            (p) => this.file[t][p]?.samples?.[0]?.grapheme
          ))
      );
      return graphemes;
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
      this.$forceUpdate();
    },
    addPhoneme(type) {
      let cat = this.file[type];
      if (!cat) cat = {};
      const n = "n_" + type.charAt(0);
      if (n in cat) return;
      cat[n] = {};
      this.file[type] = cat;
      this.$forceUpdate();
    },
    deletePhoneme() {
      delete this.file[this.selectedCopy.type][this.selectedCopy.phoneme];
      this.selectedCopy = null;
      this.$forceUpdate();
    },
    submitPhoneme() {
      const t = this.selectedCopy.type;
      const p = this.selectedCopy.phoneme;
      if (!p) return;
      delete this.selectedCopy.type;
      delete this.selectedCopy.phoneme;
      delete this.file[this.selectedType][this.selectedPhoneme];
      this.file[t][p] = JSON.parse(JSON.stringify(this.selectedCopy));
      this.selectPhoneme(t, p);
    },
    addNote() {
      if (!this.selectedCopy.notes) this.selectedCopy.notes = [];
      this.selectedCopy.notes.push("");
      this.$forceUpdate();
    },
    deleteNote(i) {
      this.selectedCopy.notes.splice(i, 1);
      if (this.selectedCopy.notes.length == 0) delete this.selectedCopy.notes;
      this.$forceUpdate();
    },
    addSample() {
      if (!this.selectedCopy.samples) this.selectedCopy.samples = [];
      this.selectedCopy.samples.push({});
      this.$forceUpdate();
    },
    deleteSample(i) {
      this.selectedCopy.samples.splice(i, 1);
      if (this.selectedCopy.samples.length == 0)
        delete this.selectedCopy.samples;
      this.$forceUpdate();
    },
  },
};
</script>

<style lang="scss" scoped>
.section {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: map-get($margins, "double");
}
button.add {
  color: var(--color-highlight);
}
button.delete {
  color: var(--color-alert);
}
.table button.add {
  height: 40px;
}
textarea {
  font-size: map-get($font-sizes, "small");
}
input[type="text"] {
  height: map-get($button-height, "small");
}
.edit,
.sample {
  gap: map-get($margins, "half");
  display: grid;
  grid-template-columns: 64px 1fr 1fr;
  flex: 1;
  * {
    width: 100%;
    height: 100%;
  }
}
.edit {
  grid-template-columns: 1fr 36px;
}
</style>
