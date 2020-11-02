<template>
  <div class="section panel-sparse">
    <div class="panel-horizontal-dense wrap small card">
      <router-link to="/home">Home</router-link>
      <p class="text-dot" />
      <router-link to="/editor/phonology">Phonology</router-link>
      <router-link to="/editor/converter">Converter</router-link>
      <router-link to="/editor/phrasebook">Phrasebook</router-link>
      <Button @click.native="loadFromLect" text="load from lect" />
      <Button @click.native="loadFromJson" text="load from JSON" />
      <Button @click.native="saveToJson" text="save JSON to clipboard" />
      <Button @click.native="reset" text="reset" />
    </div>
    <div class="grid">
      <div class="panel scroll">
        <div class="panel">
          <template v-if="file">
            <div class="panel-horizontal-dense small">
              <h2 class="flex">Phonemes</h2>
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
          </template>
        </div>
      </div>
      <div class="panel small" v-if="phoneme">
        <div class="panel-horizontal-dense">
          <h2>Phoneme</h2>
          <input
            class="flex"
            type="text"
            v-model="phoneme.phoneme"
            placeholder="phoneme"
          />
          <Button @click.native="deletePhoneme" icon="delete" />
        </div>
        <div class="panel-dense">
          <div class="panel-horizontal-dense">
            <h2 class="flex">Notes</h2>
            <Button @click.native="addItem('notes', '')" icon="add" />
          </div>
          <p class="text-caption text-faded">
            You can add notes to clarify certain use cases or to give some
            additional info.
          </p>
          <div
            class="panel-horizontal-dense"
            :key="i"
            v-for="(n, i) in phoneme.notes"
          >
            <textarea v-model="phoneme.notes[i]" class="flex note" />
            <Button @click.native="deleteItem(i, 'notes')" icon="delete" />
          </div>
        </div>
        <div class="panel-dense">
          <div class="panel-horizontal-dense">
            <h2 class="flex">Samples</h2>
            <Button @click.native="addItem('samples', {})" icon="add" />
          </div>
          <p class="text-caption text-faded">
            Use cases of the phoneme within the language, defined by a letter, a
            word, and the word's ipa.
          </p>
          <div
            :key="i"
            v-for="(s, i) in phoneme.samples"
            class="panel-horizontal-dense sample"
          >
            <input type="text" v-model="s.grapheme" placeholder="grapheme" />
            <input
              class="flex"
              type="text"
              v-model="s.word"
              placeholder="word"
            />
            <input class="flex" type="text" v-model="s.ipa" placeholder="ipa" />
            <Button @click.native="deleteItem(i, 'samples')" icon="delete" />
          </div>
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
  },
  mounted() {
    try {
      const file = JSON.parse(localStorage.pEditor);
      if (file) this.file = file;
      return;
    } catch (error) {
      console.log(error);
    }
    this.reset();
  },
  updated() {
    localStorage.pEditor = JSON.stringify(this.file);
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
      navigator.clipboard.writeText(JSON.stringify(this.file));
    },
    reset() {
      this.file = [];
      this.phoneme = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  margin-top: -1 * map-get($margins, "double");
  padding-top: 2 * map-get($margins, "normal");
}
.grid {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: map-get($margins, "double");
}
.sample input {
  width: 64px;
}

@media only screen and (max-width: $mobile-width) {
  .grid {
    grid-template-columns: 1fr;
    direction: ltr;
  }
}
</style>
