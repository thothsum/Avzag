<template>
  <div class="section panel-sparse small">
    <div id="header" class="panel-horizontal-dense wrap card">
      <router-link to="/home">Home</router-link>
      <p class="text-dot" />
      <router-link to="/editor/phonology">Phonology</router-link>
      <router-link to="/editor/converter">Converter</router-link>
      <router-link to="/editor/phrasebook">Phrasebook</router-link>
      <Button @click.native="loadFromLect" icon="language" text="Load lect" />
      <Button @click.native="loadFromJson" icon="code" text="Load JSON" />
      <Button
        @click.native="saveToJson"
        icon="content_paste"
        text="Save to clipboard"
      />
      <p class="text-dot" />
      <ButtonAlert @confirm="reset" text="Reset" />
    </div>
    <div class="grid small" v-if="phrasebook && file">
      <div class="panel-sparse">
        <div class="panel wrap card">
          <div class="panel-horizontal">
            <p class="icon">topic</p>
            <h2 class="panel flex">
              <Select :value.sync="section" :items="categories" />
            </h2>
          </div>
          <div class="panel-horizontal" v-if="section">
            <p class="icon">short_text</p>
            <Select
              class="flex"
              :value.sync="selected"
              :items="phrases"
              display="preview"
              :indexed="true"
            />
          </div>
          <PhraseContext :context="context" />
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
        </div>
        <ActionHeader
          v-if="translation"
          @action="addBlock"
          icon="account_tree"
          header="Blocks"
        >
          <template #header v-if="block">
            <ButtonAlert @confirm="removeBlock" />
          </template>
          <PhraseContext
            v-if="translation.context"
            :context="context"
            :translation="translation.context"
          />
          <div class="panel-horizontal wrap block-editor">
            <div
              class="panel-horizontal-dense"
              :key="b.states[0].display[0].text"
              v-for="b in blocks"
            >
              <Button
                @click.native="block = b"
                icon="edit"
                :class="{ highlight: block == b }"
              />
              <PhraseBlock
                :id="selected"
                :context.sync="context"
                :interactive="true"
                :block="b"
              />
            </div>
          </div>
        </ActionHeader>
        <NotesEditor :notes.sync="translation.notes">
          You can add notes, for example, to explain certain grammatical rules.
        </NotesEditor>
        <PhraseContextTranslation
          :translation.sync="translation.context"
          :context="fullContext"
        >
          Translate the context keys (entites & tags) to provide full phrase
          localization.
        </PhraseContextTranslation>
      </div>
      <PhraseBlockEditor
        v-if="block"
        @remove="removeBlock"
        :block="block"
        :context="fullContext"
      />
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button";
import ActionHeader from "@/components/ActionHeader";
import ButtonAlert from "@/components/ButtonAlert";
import Select from "@/components/Select";
import PhraseBlock from "@/components/PhraseBlock";
import PhraseContext from "@/components/PhraseContext";
import PhraseBlockEditor from "@/components/PhraseBlockEditor";
import NotesEditor from "@/components/NotesEditor";
import PhraseContextTranslation from "@/components/PhraseContextTranslation";

export default {
  name: "PhrasebookEditor",
  components: {
    Button,
    ActionHeader,
    ButtonAlert,
    Select,
    PhraseBlock,
    PhraseContext,
    PhraseBlockEditor,
    NotesEditor,
    PhraseContextTranslation,
  },
  data() {
    return {
      file: undefined,
      section: "",
      selected: 0,
      context: undefined,
      translation: undefined,
      block: undefined,
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
      return this.phrasebook ? this.phrasebook[this.section] : null;
    },
    phrase() {
      return this.phrases ? this.phrases[this.selected] : null;
    },
    blocks() {
      return this.translation?.blocks;
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
    blocks() {
      this.block = this.blocks ? this.blocks[this.blocks.length - 1] : null;
    },
    file() {
      this.fillMissing();
    },
    section: {
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
  mounted() {
    try {
      const file = JSON.parse(localStorage.phEditor);
      if (file) this.file = file;
      return;
    } catch (error) {
      console.log(error);
    }
    this.reset();
  },
  updated() {
    localStorage.phEditor = JSON.stringify(this.file);
  },
  methods: {
    fillMissing() {
      if (!this.file) return;
      if (!this.file[this.section]) this.file[this.section] = [];
      let cat = this.file[this.section];
      if (!cat[this.selected]) {
        while (cat.length < this.selected) cat.push({});
        this.$set(cat, this.selected, {});
      }
      this.translation = this.file[this.section][this.selected];
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
    },
    addBlock() {
      if (this.blocks) this.blocks.push({});
      else this.$set(this.translation, "blocks", [{}]);
      this.block = this.blocks[this.blocks.length - 1];
    },
    removeBlock() {
      this.$delete(this.blocks, this.blocks.indexOf(this.block));
      this.block = this.blocks[this.blocks.length - 1];
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
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr);
  gap: map-get($margins, "double");
}
@media only screen and (max-width: $mobile-width) {
  .grid {
    grid-template-columns: 100%;
  }
}
</style>


<style lang="scss">
.block-editor {
  gap: 4px 8px;
}
</style>
