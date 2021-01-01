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
      <control icon="language" text="Load lect" @click="loadFromLect" />
      <control icon="code" text="Load JSON" @click="loadFromJson" />
      <control
        icon="content_paste"
        text="Save to clipboard"
        @click="saveToJson"
      />
      <p class="text-dot" />
      <ButtonAlert text="Reset" @confirm="reset" />
    </div>
    <div v-if="file" class="grid small">
      <div class="col-2">
        <ActionHeader icon="topic" header="sections" @action="addSection">
          <template v-if="section" #header>
            <ButtonAlert @confirm="removeSection" />
          </template>
          <div class="col scroll">
            <div v-for="s in file" :key="s.id" class="row">
              <control
                icon="edit"
                :class="{ highlight: section == s }"
                @click="section = s"
              />
              <input v-model="s.name" class="flex" type="text" />
            </div>
          </div>
        </ActionHeader>
        <ActionHeader
          v-if="section"
          icon="short_text"
          header="phrases"
          @action="addPhrase"
        >
          <template v-if="phrase" #header>
            <ButtonAlert @confirm="removePhrase" />
          </template>
          <div class="col scroll">
            <div v-for="p in section.phrases" :key="p.id" class="row">
              <control
                icon="edit"
                :class="{ highlight: phrase == p }"
                @click="phrase = p"
              />
              <input v-model="p.preview" class="flex" type="text" />
            </div>
          </div>
        </ActionHeader>
        <ActionHeader
          v-if="phrase"
          icon="account_tree"
          header="Blocks"
          @action="addBlock"
        >
          <template v-if="block" #header>
            <ButtonAlert @confirm="removeBlock" />
          </template>
          <PhraseContext :context="context" />
          <div class="row-1 wrap block-editor">
            <div
              v-for="(b, i) in blocks"
              :key="i + '_' + phrase.id"
              class="row"
            >
              <control
                icon="edit"
                :class="{ highlight: block == b }"
                @click="block = b"
              />
              <PhraseBlock
                :id="phrase.id"
                v-model:context="context"
                :interactive="true"
                :block="b"
              />
            </div>
          </div>
        </ActionHeader>
        <PhraseContextEditor v-if="phrase" :context="contextSource" />
      </div>
      <PhraseBlockEditor
        v-if="phrase && block"
        :block="block"
        :context="fullContext"
        @remove="removeBlock"
      />
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

import ButtonAlert from "@/components/ButtonAlert";
import ActionHeader from "@/components/ActionHeader";
import PhraseContext from "@/components/PhraseContext";
import PhraseContextEditor from "@/components/PhraseContextEditor";
import PhraseBlock from "@/components/PhraseBlock";
import PhraseBlockEditor from "@/components/PhraseBlockEditor";

export default {
  name: "PhrasebookCorpusEditor",
  components: {
    ButtonAlert,
    ActionHeader,
    PhraseContext,
    PhraseContextEditor,
    PhraseBlock,
    PhraseBlockEditor,
  },
  data() {
    return {
      file: [],
      section: undefined,
      phrase: undefined,
      block: undefined,
      context: undefined,
      fullContext: undefined,
    };
  },
  computed: {
    contextSource() {
      return this.phrase?.context ?? [];
    },
    blocks() {
      return this.phrase?.blocks;
    },
  },
  watch: {
    section() {
      this.phrase = this.section?.phrases[0];
    },
    phrase: {
      handler() {
        this.context = {};
        this.fullContext = {};
        this.contextSource.forEach(({ entity, tags }) => {
          this.context[entity] = new Set();
          this.fullContext[entity] = tags.split(" ");
        });
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    try {
      const file = JSON.parse(localStorage.pbcEditor);
      if (file) this.file = file;
      return;
    } catch (error) {
      console.log(error);
    }
    this.reset();
  },
  updated() {
    localStorage.pbcEditor = JSON.stringify(this.file);
  },
  beforeUnmount() {
    localStorage.pbcEditor = JSON.stringify(this.file);
  },
  methods: {
    addSection() {
      const s = {
        id: uuidv4(),
        name: "New section",
        phrases: [],
      };
      this.file.push(s);
      this.section = s;
    },
    removeSection() {
      this.$delete(this.file, this.file.indexOf(this.section));
    },
    addPhrase() {
      const p = {
        id: uuidv4(),
        preview: "New phrase",
        context: [],
        blocks: [],
      };
      this.section.phrases.push(p);
      this.phrase = p;
    },
    removePhrase() {
      this.$delete(
        this.section.phrases,
        this.section.phrases.indexOf(this.phrase)
      );
    },
    addBlock() {
      const b = {};
      this.blocks.push(b);
      this.block = b;
    },
    removeBlock() {
      this.$delete(this.blocks, this.blocks.indexOf(this.block));
      this.block = this.blocks[this.blocks.length - 1];
    },
    loadFromLect() {
      fetch(this.$store.state.root + "/phrasebook.json")
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

<style lang="scss" scoped>
.scroll {
  max-height: 128px;
}
</style>
