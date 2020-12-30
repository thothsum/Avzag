<template>
  <div class="section col-2 small">
    <div class="row wrap small card">
      <router-link to="/home">Home</router-link>
      <p class="text-dot" />
      <router-link to="/editor/phonology">Phonology</router-link>
      <router-link to="/editor/converter">Converter</router-link>
      <router-link to="/editor/phrasebook">Phrasebook</router-link>
      <router-link to="/editor/phrasebook/corpus">
        Phrasebook Corpus
      </router-link>
      <Button text="load from lect" @click="loadFromLect" />
      <Button text="load from JSON" @click="loadFromJson" />
      <Button text="save JSON to clipboard" @click="saveToJson" />
      <ButtonAlert text="Reset" @confirm="reset" />
    </div>
    <div class="grid">
      <ActionHeader icon="view_comfy" header="Phonemes" @action="addPhoneme">
        <div class="row wrap">
          <PhoneticItem
            v-for="(p, i) in file"
            :key="i"
            :selected="phoneme == p"
            :ipa="p.phoneme"
            :str="graphemes[i]"
            @click="phoneme = p"
          />
        </div>
      </ActionHeader>
      <div v-if="phoneme" class="col-2 small">
        <ActionHeader button="" icon="hearing" header="Phoneme">
          <template #header><ButtonAlert @confirm="removePhoneme" /></template>
          <input
            v-model="phoneme.phoneme"
            type="text"
            class="text-ipa"
            placeholder="phoneme"
          />
        </ActionHeader>
        <NotesEditor v-model="phoneme.notes">
          You can add notes to clarify certain use cases or to give some
          additional info.
        </NotesEditor>
        <ActionHeader header="Samples" icon="playlist_play" @action="addSample">
          <template #caption>
            Use cases of the phoneme within the language, defined by a letter, a
            word, and the word's ipa.
          </template>
          <template #default>
            <div v-for="(s, i) in phoneme.samples" :key="i" class="row sample">
              <input v-model="s.grapheme" type="text" placeholder="grapheme" />
              <input
                v-model="s.word"
                class="flex"
                type="text"
                placeholder="word"
              />
              <input
                v-model="s.ipa"
                class="flex text-ipa"
                type="text"
                placeholder="ipa"
              />
              <Button icon="clear" @click="removeSample(i)" />
            </div>
          </template>
        </ActionHeader>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button";
import ButtonAlert from "@/components/ButtonAlert";
import ActionHeader from "@/components/ActionHeader";
import PhoneticItem from "@/components/PhoneticItem";
import NotesEditor from "@/components/Notes/Editor";

export default {
  name: "PhonologyEditor",
  components: {
    Button,
    ButtonAlert,
    ActionHeader,
    PhoneticItem,
    NotesEditor,
  },
  data() {
    return {
      file: undefined,
      phoneme: undefined,
    };
  },
  computed: {
    graphemes() {
      return this.file.map((p) => p?.samples?.[0]?.grapheme);
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
  beforeUnmount() {
    localStorage.pEditor = JSON.stringify(this.file);
  },
  methods: {
    addPhoneme() {
      const p = { phoneme: "new" };
      this.file.push(p);
      this.phoneme = p;
    },
    removePhoneme() {
      const i = this.file.indexOf(this.phoneme);
      this.file.splice(i, 1);
      this.phoneme = this.file[this.file.length - 1];
    },
    addSample() {
      if (this.phoneme.samples) this.phoneme.samples.push({});
      else this.$set(this.phoneme, "samples", [{}]);
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
