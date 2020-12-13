<template>
  <div class="section col-2 small">
    <div id="header" class="row wrap card">
      <router-link to="/home">Home</router-link>
      <p class="text-dot" />
      <router-link to="/editor/phonology">Phonology</router-link>
      <router-link to="/editor/converter">Converter</router-link>
      <router-link to="/editor/phrasebook">Phrasebook</router-link>
      <router-link to="/editor/phrasebook/corpus">
        Phrasebook Corpus
      </router-link>
      <Button icon="language" text="Load lect" @click="loadFromLect" />
      <Button icon="code" text="Load JSON" @click="loadFromJson" />
      <Button
        icon="content_paste"
        text="Save to clipboard"
        @click="saveToJson"
      />
      <p class="text-dot" />
      <ButtonAlert text="Reset" @confirm="reset" />
    </div>
    <div v-if="phrasebook && phrasebook.length && file" class="grid small">
      <div class="col-2">
        <div class="col-1 wrap card">
          <div class="row-1">
            <p class="icon">topic</p>
            <h2 class="col-1 flex">
              <Select
                v-model:value="section"
                :items="phrasebook"
                display="name"
              />
            </h2>
          </div>
          <div v-if="phrases" class="row-1">
            <p class="icon">short_text</p>
            <Select
              v-model:value="phrase"
              class="flex"
              :items="phrases"
              display="preview"
            />
          </div>
          <p class="text-faded text-caption">
            The source corpus is loading from what is saved on Phrasebook
            Corppus editor page.
          </p>
          <template v-if="phrase">
            <PhraseContext :context="context" />
            <div v-if="phrase.blocks && phrase.blocks.length" class="row wrap">
              <PhraseBlock
                v-for="(b, i) in phrase.blocks"
                :id="phrase.id"
                :key="i + '-' + phrase.id"
                v-model:context="context"
                :interactive="true"
                :block="b"
              />
            </div>
          </template>
        </div>
        <template v-if="phrase && translation">
          <ActionHeader icon="account_tree" header="Blocks" @action="addBlock">
            <template v-if="block" #header>
              <ButtonAlert @confirm="removeBlock" />
            </template>
            <PhraseContext
              v-if="translation.context"
              :context="context"
              :translation="translation.context"
            />
            <div class="row-1 wrap block-editor">
              <div
                v-for="(b, i) in blocks"
                :key="state + '_' + i + '_' + phrase.id"
                class="row"
              >
                <Button
                  icon="edit"
                  :class="{ highlight: block == b }"
                  @click="block = b"
                />
                <PhraseBlock
                  :id="state + phrase.id"
                  v-model:context="context"
                  :interactive="true"
                  :block="b"
                />
              </div>
            </div>
          </ActionHeader>
          <NotesEditor v-model:notes="translation.notes">
            You can add notes, for example, to explain certain grammatical
            rules.
          </NotesEditor>
          <PhraseContextTranslation
            v-model:translation="translation.context"
            :context="fullContext"
          >
            Translate the context keys (entites & tags) to provide full phrase
            localization.
          </PhraseContextTranslation>
        </template>
      </div>
      <PhraseBlockEditor
        v-if="block"
        :block="block"
        :context="fullContext"
        @remove="removeBlock"
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
      state: 0,
      lect: "default",
      file: undefined,
      section: undefined,
      phrase: undefined,
      context: undefined,
      fullContext: undefined,
      translation: undefined,
      block: undefined,
      phrasebook: undefined,
    };
  },
  computed: {
    phrases() {
      return this.section?.phrases ?? [];
    },
    blocks() {
      return this.translation?.blocks;
    },
  },
  watch: {
    phrasebook() {
      if (this.file && this.phrasebook?.length) {
        this.section = this.phrasebook[0];
        this.phrase = this.section?.phrases[0];
        this.fillMissing();
      }
    },
    file() {
      this.state = Math.random();
      if (this.file && this.phrasebook?.length) {
        this.section = this.phrasebook[0];
        this.phrase = this.section?.phrases[0];
        this.fillMissing();
      }
    },
    section: {
      handler() {
        this.phrase = this.phrases[0];
      },
      immediate: true,
    },
    phrase: {
      handler() {
        if (!this.phrase) return;

        this.context = {};
        this.fullContext = {};
        this.phrase.context.forEach(({ entity, tags }) => {
          this.context[entity] = new Set();
          this.fullContext[entity] = tags.split(" ");
        });

        this.fillMissing();
      },
      immediate: true,
    },
    blocks() {
      this.block = this.blocks ? this.blocks[this.blocks.length - 1] : null;
    },
  },
  mounted() {
    try {
      this.file = JSON.parse(localStorage.pbEditor) ?? {};
    } catch {
      console.log("phrasebook did not load");
      this.file = {};
    }

    try {
      this.phrasebook = JSON.parse(localStorage.pbcEditor);
    } catch {
      this.phrasebook = {};
    }
    if (!Object.keys(this.phrasebook ?? {})?.length) {
      fetch(this.$store.state.root + "/phrasebook.json")
        .then((r) => r.json())
        .then((j) => {
          if (j) this.phrasebook = j;
        });
    }
  },
  updated() {
    localStorage.pbEditor = JSON.stringify(this.file);
  },
  beforeUnmount() {
    localStorage.pbEditor = JSON.stringify(this.file);
  },
  methods: {
    fillMissing() {
      if (!(this.file && this.section && this.phrase)) return;
      if (!this.file[this.phrase.id]) this.$set(this.file, this.phrase.id, {});
      this.translation = this.file[this.phrase.id];
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
      this.file = {};
    },
    addBlock() {
      this.block = {};
      if (this.blocks) this.blocks.push(this.block);
      else this.$set(this.translation, "blocks", [this.block]);
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
