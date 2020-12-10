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
      <Button @click="loadFromLect" icon="language" text="Load lect" />
      <Button @click="loadFromJson" icon="code" text="Load JSON" />
      <Button
        @click="saveToJson"
        icon="content_paste"
        text="Save to clipboard"
      />
      <p class="text-dot" />
      <ButtonAlert @confirm="reset" text="Reset" />
    </div>
    <div class="grid small" v-if="file">
      <div class="col-2">
        <ActionHeader @action="addSection" icon="topic" header="sections">
          <template #header v-if="section">
            <ButtonAlert @confirm="removeSection" />
          </template>
          <div class="col scroll">
            <div class="row" :key="s.id" v-for="s in file">
              <Button
                icon="edit"
                @click="section = s"
                :class="{ highlight: section == s }"
              />
              <input class="flex" type="text" v-model="s.name" />
            </div>
          </div>
        </ActionHeader>
        <ActionHeader
          @action="addPhrase"
          icon="short_text"
          header="phrases"
          v-if="section"
        >
          <template #header v-if="phrase">
            <ButtonAlert @confirm="removePhrase" />
          </template>
          <div class="col scroll">
            <div class="row" :key="p.id" v-for="p in section.phrases">
              <Button
                icon="edit"
                @click="phrase = p"
                :class="{ highlight: phrase == p }"
              />
              <input class="flex" type="text" v-model="p.preview" />
            </div>
          </div>
        </ActionHeader>
        <ActionHeader
          v-if="phrase"
          @action="addBlock"
          icon="account_tree"
          header="Blocks"
        >
          <template #header v-if="block">
            <ButtonAlert @confirm="removeBlock" />
          </template>
          <PhraseContext :context="context" />
          <div class="row-1 wrap block-editor">
            <div
              class="row"
              :key="i + '_' + phrase.id"
              v-for="(b, i) in blocks"
            >
              <Button
                @click="block = b"
                icon="edit"
                :class="{ highlight: block == b }"
              />
              <PhraseBlock
                :id="phrase.id"
                :context.sync="context"
                :interactive="true"
                :block="b"
              />
            </div>
          </div>
        </ActionHeader>
        <PhraseContextEditor :context="contextSource" v-if="phrase" />
      </div>
      <PhraseBlockEditor
        v-if="phrase && block"
        @remove="removeBlock"
        :block="block"
        :context="fullContext"
      />
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

import Button from "@/components/Button";
import ButtonAlert from "@/components/ButtonAlert";
import ActionHeader from "@/components/ActionHeader";
import PhraseContext from "@/components/PhraseContext";
import PhraseContextEditor from "@/components/PhraseContextEditor";
import PhraseBlock from "@/components/PhraseBlock";
import PhraseBlockEditor from "@/components/PhraseBlockEditor";

export default {
  name: "PhrasebookCorpusEditor",
  components: {
    Button,
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
      return this.phrase?.context;
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
        this.contextSource?.forEach(({ entity, tags }) => {
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
  beforeDestroy() {
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
