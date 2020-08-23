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
            :str="Object.keys(u.samples)[0]"
            :key="p"
            v-for="(u, p) of file[t]"
          />
          <button class="add icon" @click="addPhoneme(t)">add</button>
        </div>
      </div>
    </div>
    <div class="card panel" v-if="selectedCopy">
      <div class="panel-horizontal">
        <button @click="deletePhoneme" class="small">delete phoneme</button>
        <button @click="applyPhoneme" class="small">apply all changes</button>
      </div>
      <input type="text" v-model="selectedCopy.phoneme" />
      <div class="panel-horizontal">
        <h3>Notes</h3>
        <button @click="addNote" class="icon add small">add</button>
      </div>
      <div :key="i" v-for="(n,i) in selectedCopy.notes" class="panel-horizontal">
        <textarea v-model="selectedCopy.notes[i]" style="flex:1" />
        <button @click="deleteNote(i)" class="icon delete">delete</button>
      </div>
      <div class="panel-horizontal">
        <h3>Samples</h3>
        <button @click="addGrapheme" class="icon add small">add</button>
      </div>
      <div :key="g" v-for="(s, g) of selectedCopy.samples" class="card panel">
        {{g}}
        <button @click="deletePhoneme" class="small">add sample</button>
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
    addNote() {
      if (!this.selectedCopy.notes) {
        this.selectedCopy.notes = [];
        this.$forceUpdate();
      }
      this.selectedCopy.notes.push("");
    },
    deleteNote(i) {
      this.selectedCopy.notes.splice(i, 1);
      if (this.selectedCopy.notes.length == 0) {
        delete this.selectedCopy.notes;
        this.$forceUpdate();
      }
    },
    addGrapheme() {},
  },
};
</script>

<style lang="scss" scoped>
.section {
  display: grid;
  grid-template-columns: 1fr 300px;
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
input[type="text"] {
  height: map-get($button-height, "small");
}
</style>
