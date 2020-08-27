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
      <div class="panel">
        <h3>JSON</h3>

        <div class="panel-horizontal-dense">
          <button class="small" @click="loadFromLect">import from lect</button>
          <button class="small" @click="loadFromJson">import from JSON</button>
          <button class="small" @click="loadToJson">export to JSON</button>
        </div>
        <textarea v-model="jsonInput"></textarea>
      </div>
    </div>
    <div class="panel" v-if="selectedCopy">
      <div class="panel-horizontal-dense card">
        <h3>Phoneme</h3>
        <input type="text" v-model="selectedCopy.phoneme" placeholder="phoneme" />
        <button @click="deletePhoneme" class="small">delete</button>
        <button @click="submitPhoneme" class="small">submit</button>
      </div>
      <div class="panel card">
        <div class="panel-horizontal-dense">
          <h3>Notes</h3>
          <button @click="addItem('notes', '')" class="icon add small">add</button>
        </div>
        <div :key="i" v-for="(n,i) in selectedCopy.notes" class="edit">
          <textarea v-model="selectedCopy.notes[i]" class="flex note" />
          <button @click="deleteItem(i, 'notes')" class="icon delete small">delete</button>
        </div>
      </div>
      <div class="panel card">
        <div class="panel-horizontal-dense">
          <h3>Samples</h3>
          <button @click="addItem('samples', {})" class="icon add small">add</button>
        </div>
        <div :key="i" v-for="(s,i) in selectedCopy.samples" class="panel-dense edit">
          <div class="sample">
            <input type="text" v-model="s.grapheme" placeholder="grapheme" />
            <input type="text" v-model="s.word" placeholder="word" />
            <input type="text" v-model="s.ipa" placeholder="ipa" />
          </div>
          <button @click="deleteItem(i, 'samples')" class="icon delete small">delete</button>
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
      jsonInput: null,
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
  methods: {
    selectPhoneme(t, p) {
      this.selectedType = t;
      this.selectedPhoneme = p;

      let copy = JSON.parse(JSON.stringify(this.file[t][p]));
      copy.phoneme = p;
      if (!copy.notes) copy.notes = [];
      if (!copy.samples) copy.samples = [];
      this.selectedCopy = copy;
      this.$forceUpdate();
    },
    addPhoneme(type) {
      let cat = this.file[type];
      if (!cat) cat = {};
      const n = "n_" + type.charAt(0);
      if (n in cat) return;
      cat[n] = {};
      this.file[type] = cat;
      this.selectPhoneme(type, n);
    },
    deletePhoneme() {
      delete this.file[this.selectedType][this.selectedPhoneme];
      this.selectFirst();
    },
    submitPhoneme() {
      if (!this.selectedCopy.phoneme) return;
      const t = this.selectedType;
      const p = this.selectedPhoneme;
      const np = this.selectedCopy.phoneme;

      let copy = this.selectedCopy;
      delete this.file[t][p];
      delete copy.phoneme;
      if (copy.samples.length == 0) delete copy.samples;
      if (copy.notes.length == 0) delete copy.notes;

      this.file[t][np] = JSON.parse(JSON.stringify(copy));
      this.selectPhoneme(t, np);
    },
    addItem(key, value) {
      this.selectedCopy[key].push(value);
      this.$forceUpdate();
    },
    deleteItem(i, key) {
      this.selectedCopy[key].splice(i, 1);
      this.$forceUpdate();
    },
    loadFromLect() {
      fetch(this.$store.state.root + this.jsonInput + "/phonemes.json")
        .then((r) => r.json())
        .then((j) => {
          if (j) this.file = j;
        });
      this.$forceUpdate();
    },
    loadFromJson() {
      const json = JSON.parse(this.jsonInput);
      if (json) this.file = json;
      this.$forceUpdate();
    },
    loadToJson() {
      this.jsonInput = JSON.stringify(this.file);
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
