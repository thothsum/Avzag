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
      <div class="panel-sparse small" v-if="phoneme">
        <div class="panel-horizontal-dense">
          <h2>Phoneme</h2>
          <input
            class="flex"
            type="text"
            v-model="phoneme.phoneme"
            placeholder="phoneme"
          />
          <Button @click.native="removePhoneme" icon="delete" />
        </div>
        <NotesEditor
          :notes.sync="phoneme.notes"
          caption="You can add notes to clarify certain use cases or to give some
            additional info."
        />
        <div class="panel-dense">
          <h2>Samples</h2>
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
            <Button @click.native="removeSample(i)" icon="clear" />
          </div>
          <Button
            class="center"
            @click.native="addSample('samples')"
            icon="add"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button";
import PhoneticItem from "@/components/PhoneticItem";
import NotesEditor from "@/components/NotesEditor";

export default {
  name: "PhonologyEditor",
  components: {
    Button,
    PhoneticItem,
    NotesEditor,
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
    removePhoneme() {
      let i = this.file.indexOf(this.phoneme);
      this.file.splice(i, 1);
      this.phoneme = this.file[this.file.length - 1];
    },
    addSample() {
      if (!this.phoneme.samples) this.phoneme.samples = [];
      this.phoneme.samples.push({});
    },
    removeSample(i) {
      this.$delete(this.phoneme.samples, i);
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
  grid-template-columns: minmax(0, 1fr) 352px;
  gap: map-get($margins, "double");
}
.sample input {
  width: 64px;
}
@media only screen and (max-width: $mobile-width) {
  .grid {
    grid-template-columns: 100%;
  }
}
</style>
