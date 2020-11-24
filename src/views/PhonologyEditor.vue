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
      <Button @click.native="loadFromLect" text="load from lect" />
      <Button @click.native="loadFromJson" text="load from JSON" />
      <Button @click.native="saveToJson" text="save JSON to clipboard" />
      <ButtonAlert @confirm="reset" text="Reset" />
    </div>
    <div class="grid">
      <ActionHeader @action="addPhoneme" icon="view_comfy" header="Phonemes">
        <div class="row wrap">
          <PhoneticItem
            @click.native="phoneme = p"
            :selected="phoneme == p"
            :ipa="p.phoneme"
            :str="graphemes[i]"
            :key="i"
            v-for="(p, i) in file"
          />
        </div>
      </ActionHeader>
      <div class="col-2 small" v-if="phoneme">
        <ActionHeader button="" icon="hearing" header="Phoneme">
          <template #header><ButtonAlert @confirm="removePhoneme" /></template>
          <input
            type="text"
            class="text-ipa"
            v-model="phoneme.phoneme"
            placeholder="phoneme"
          />
        </ActionHeader>
        <NotesEditor :notes.sync="phoneme.notes">
          You can add notes to clarify certain use cases or to give some
          additional info.
        </NotesEditor>
        <ActionHeader @action="addSample" header="Samples" icon="playlist_play">
          <template #caption>
            Use cases of the phoneme within the language, defined by a letter, a
            word, and the word's ipa.
          </template>
          <template #default>
            <div :key="i" v-for="(s, i) in phoneme.samples" class="row sample">
              <input type="text" v-model="s.grapheme" placeholder="grapheme" />
              <input
                class="flex"
                type="text"
                v-model="s.word"
                placeholder="word"
              />
              <input
                class="flex text-ipa"
                type="text"
                v-model="s.ipa"
                placeholder="ipa"
              />
              <Button @click.native="removeSample(i)" icon="clear" />
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
import NotesEditor from "@/components/NotesEditor";

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
  beforeDestroy() {
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
