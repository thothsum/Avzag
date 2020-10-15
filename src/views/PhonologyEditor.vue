<template>
  <div class="section" v-if="file">
    <div class="panel scroll">
      <div class="panel">
        <div class="panel-horizontal-dense">
          <Button @click.native="loadFromLect" text="load from a lect" />
          <Button @click.native="loadFromJson" text="load from JSON" />
          <Button @click.native="saveToJson" text="save JSON to clipboard" />
          <Button @click.native="reset" text="reset" />
        </div>
        <div class="panel-horizontal-dense">
          <h2 class="flex">Notes</h2>
          <Button @click.native="addPhoneme" icon="add" />
        </div>
        <div class="table panel-horizontal-dense wrap">
          <PhoneticItem
            @click.native="phoneme = p"
            :selected="phoneme == p"
            :ipa="p.phoneme"
            :str="graphemes[i]"
            :key="i"
            v-for="(p, i) in file"
          />
        </div>
      </div>
    </div>
    <div class="panel" v-if="phoneme">
      <div class="panel-horizontal-dense card">
        <h2>Phoneme</h2>
        <input
          class="flex"
          type="text"
          v-model="phoneme.phoneme"
          placeholder="phoneme"
        />
        <Button @click.native="deletePhoneme" icon="delete" />
      </div>
      <div class="panel-dense card">
        <div class="panel-horizontal-dense">
          <h2 class="flex">Notes</h2>
          <Button @click.native="addItem('notes', '')" icon="add" />
        </div>
        <div :key="i" v-for="(n, i) in phoneme.notes" class="edit">
          <textarea v-model="phoneme.notes[i]" class="flex note" />
          <Button @click.native="deleteItem(i, 'notes')" icon="delete" />
        </div>
      </div>
      <div class="panel-dense card">
        <div class="panel-horizontal-dense">
          <h2 class="flex">Samples</h2>
          <Button @click.native="addItem('samples', {})" icon="add" />
        </div>
        <div
          :key="i"
          v-for="(s, i) in phoneme.samples"
          class="panel-dense edit"
        >
          <div class="sample">
            <input type="text" v-model="s.grapheme" placeholder="grapheme" />
            <input type="text" v-model="s.word" placeholder="word" />
            <input type="text" v-model="s.ipa" placeholder="ipa" />
          </div>
          <Button @click.native="deleteItem(i, 'samples')" icon="delete" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button";
import PhoneticItem from "@/components/PhoneticItem";

export default {
  name: "PhonologyEditor",
  components: {
    Button,
    PhoneticItem,
  },
  data() {
    return {
      file: [],
      phoneme: null,
    };
  },
  computed: {
    graphemes() {
      return this.file.map((p) => p?.samples?.[0]?.grapheme);
    },
    notes() {
      return this.phoneme?.notes ?? [];
    },
    jsonOutput() {
      return JSON.stringify(this.file);
    },
  },
  mounted() {
    this.file = JSON.parse(localStorage.pEditor);
    if (!this.file) this.reset;
  },
  updated() {
    localStorage.pEditor = this.jsonOutput;
  },
  methods: {
    addPhoneme() {
      let p = { phoneme: "new" };
      this.file.push(p);
      this.phoneme = p;
    },
    deletePhoneme() {
      let i = this.file.indexOf(this.phoneme);
      this.file.splice(i, 1);
      this.phoneme = this.file[this.file.length - 1];
    },
    addItem(key, value) {
      if (!this.phoneme[key]) this.phoneme[key] = [];
      this.phoneme[key].push(value);
      this.$forceUpdate();
    },
    deleteItem(i, key) {
      this.phoneme[key].splice(i, 1);
      if (this.phoneme[key].length == 0) delete this.phoneme[key];
      this.$forceUpdate();
    },
    loadFromLect() {
      fetch(
        this.$store.state.root +
          window.prompt("Enter lect name") +
          "/phonology.json"
      )
        .then((r) => r.json())
        .then((j) => {
          if (j) this.file = j;
        });
    },
    loadFromJson() {
      const file = JSON.parse(window.prompt("Enter JSON"));
      if (file) this.file = file;
    },
    saveToJson() {
      navigator.clipboard.writeText(this.jsonOutput);
    },
    reset() {
      this.file = [];
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
.edit,
.sample {
  gap: map-get($margins, "half");
  display: grid;
  grid-template-columns: 64px 1fr 1fr;
  * {
    width: 100%;
    height: 100%;
  }
}
.edit {
  grid-template-columns: 1fr 36px;
}

@media only screen and (max-width: $mobile-width) {
  .section {
    grid-template-columns: 1fr;
    direction: ltr;
  }
}
</style>
