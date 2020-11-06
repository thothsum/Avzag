<template>
  <div class="section panel-sparse small">
    <div id="header" class="panel-horizontal-dense wrap card">
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
    <div class="grid small" v-if="phrasebook">
      <div class="panel-sparse">
        <div class="panel wrap card">
          <div class="panel-horizontal">
            <h2>Category</h2>
            <Select class="flex" :value.sync="category" :items="categories" />
          </div>
          <div class="panel-horizontal" v-if="category">
            <h2>Phrase</h2>
            <Select
              class="flex"
              :value.sync="selected"
              :items="phrases"
              display="preview"
              :indexed="true"
            />
          </div>
          <div class="panel-horizontal-dense wrap" v-if="phrase">
            <PhraseBlock
              :id="selected"
              :context.sync="context"
              :interactive="true"
              :block="b"
              :key="i"
              v-for="(b, i) in phrase.blocks"
            />
          </div>
          <PhraseContext :context="context" />
        </div>
        <div class="panel wrap card" v-if="translation">
          <h2>Translation</h2>
          <div class="panel-horizontal wrap">
            <div
              class="panel-horizontal-solid"
              :key="i"
              v-for="(b, i) in translation.blocks"
            >
              <PhraseBlock
                :id="selected"
                :context.sync="context"
                :interactive="true"
                :block="b"
              />
              <Button
                @click.native="block = b"
                icon="edit"
                :class="{ highlight: block == b }"
              />
            </div>
            <Button @click.native="addBlock" icon="add" />
          </div>
          <PhraseContext
            v-if="translation.context"
            :context="context"
            :translation="translation.context"
          />
        </div>
        <div class="panel-dense">
          <NotesEditor :notes.sync="translation.notes" />
          <PhraseContextTranslations
            :translations.sync="translation.context"
            :context="fullContext"
          />
        </div>
      </div>
      <PhraseBlockEditor v-if="block" :block="block" :context="fullContext" />
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button";
import Select from "@/components/Select";
import PhraseBlock from "@/components/PhraseBlock";
import PhraseContext from "@/components/PhraseContext";
import PhraseBlockEditor from "@/components/PhraseBlockEditor";
import NotesEditor from "@/components/NotesEditor";
import PhraseContextTranslations from "@/components/PhraseContextTranslations";

export default {
  name: "PhrasebookEditor",
  components: {
    Button,
    Select,
    PhraseBlock,
    PhraseContext,
    PhraseBlockEditor,
    NotesEditor,
    PhraseContextTranslations,
  },
  data() {
    return {
      file: [],
      category: "",
      selected: 0,
      context: {},
      translation: null,
      block: null,
    };
  },
  computed: {
    phrasebook() {
      return this.$store.state.phrasebook;
    },
    categories() {
      return Object.keys(this.phrasebook);
    },
    phrases() {
      return this.phrasebook ? this.phrasebook[this.category] : null;
    },
    phrase() {
      return this.phrases ? this.phrases[this.selected] : null;
    },
    states() {
      return this.block?.states;
    },
    fullContext() {
      return (
        this.phrase?.context?.reduce((acc, s) => {
          acc[s.entity] = s.tags.split(" ");
          return acc;
        }, {}) ?? {}
      );
    },
  },
  watch: {
    phrase: {
      handler() {
        this.context =
          this.phrase?.context?.reduce((acc, s) => {
            acc[s.entity] = new Set();
            return acc;
          }, {}) ?? {};
      },
      immediate: true,
    },
    category: {
      handler() {
        this.selected = 0;
        this.fillMissing();
      },
      immediate: true,
    },
    selected: {
      handler() {
        this.fillMissing();
      },
      immediate: true,
    },
  },
  methods: {
    fillMissing() {
      if (!this.file[this.category]) this.file[this.category] = [];
      let cat = this.file[this.category];
      if (!cat[this.selected]) {
        while (cat.length < this.selected) cat.push({});
        this.$set(cat, this.selected, {});
      }

      this.translation = this.file[this.category][this.selected];
    },
    loadFromLect() {
      fetch(
        this.$store.state.root +
          window.prompt("Enter lect name") +
          "/phrasebook.json"
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
      this.selected = 0;
    },
    addBlock() {
      if (this.translation.blocks) this.translation.blocks.push({});
      else this.$set(this.translation, "blocks", [{}]);
      this.block = this.translation.blocks[this.translation.blocks.length - 1];
    },
    deleteBlock() {
      this.$delete(
        this.translation.blocks,
        this.translation.blocks.indexOf(this.block)
      );
    },
  },
};
</script>

<style lang="scss" scoped>
#header {
  margin-top: -1 * map-get($margins, "double");
  padding-top: 2 * map-get($margins, "normal");
}
.grid {
  display: grid;
  grid-template-columns: 416px minmax(0, 1fr);
  gap: map-get($margins, "double");
}
@media only screen and (max-width: $mobile-width) {
  .grid {
    grid-template-columns: 100%;
  }
}
</style>
