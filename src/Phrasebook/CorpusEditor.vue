<template>
  <div v-if="file" class="section col-2 small grid">
    <div class="col-2">
      <EditorCard icon="topic" header="sections" @action="addSection">
        <template v-if="section" #header>
          <ButtonAlert @confirm="removeSection" />
        </template>
        <div class="col scroll">
          <div v-for="s in file" :key="s.id" class="row">
            <btn icon="edit" :is-on="section === s" @click="section = s" />
            <input v-model="s.name" class="flex" type="text" />
          </div>
        </div>
      </EditorCard>
      <EditorCard
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
            <btn icon="edit" :is-on="phrase === p" @click="phrase = p" />
            <input v-model="p.preview" class="flex" type="text" />
          </div>
        </div>
      </EditorCard>
      <EditorCard
        v-if="phrase"
        icon="account_tree"
        header="Blocks"
        @action="addBlock"
      >
        <template v-if="block" #header>
          <ButtonAlert @confirm="removeBlock" />
        </template>
        <VContext />
        <div class="row-1 wrap block-editor">
          <div
            v-for="(b, i) in phrase.blocks"
            :key="phrase.id + '--' + i"
            class="row"
          >
            <btn icon="edit" :is-on="block === b" @click="block = b" />
            <VBlock :block="b" />
          </div>
        </div>
      </EditorCard>
      <ContextEditor v-if="phrase" v-model="phrase.context" />
    </div>
    <BlockEditor v-if="block" v-model="block" @remove="removeBlock" />
  </div>
</template>

<script lang="ts">
import ButtonAlert from "@/components/ButtonAlert.vue";
import EditorCard from "@/components/EditorCard.vue";
import VContext from "./Context/index.vue";
import ContextEditor from "./Context/Editor.vue";
import VBlock from "./Block/index.vue";
import BlockEditor from "./Block/Editor.vue";

import { defineComponent, ref, provide, watch, nextTick, toRaw } from "vue";
import { v4 as uuidv4 } from "uuid";
import { setupEditor } from "@/editor";
import { Block, Context, CorpusPhrase, CorpusSection } from "./types";

export default defineComponent({
  components: {
    ButtonAlert,
    EditorCard,
    VContext,
    ContextEditor,
    VBlock,
    BlockEditor,
  },
  setup() {
    const file = setupEditor<CorpusSection[]>({
      defaultFile: {},
      filename: () => "phrasebook",
      storage: "editor.phrasebookCorpus",
    });
    const section = ref({} as CorpusSection);
    const phrase = ref({} as CorpusPhrase);
    const block = ref({} as Block);
    const context = ref({} as Context);
    const contextSource = ref({} as Context);

    provide("context", context);
    provide("contextSource", contextSource);

    watch(file, (file) => (section.value = file[file.length - 1]), {
      immediate: true,
    });
    watch(
      section,
      ({ phrases }) => (phrase.value = phrases[phrases.length - 1]),
      { immediate: true }
    );
    watch(
      () => phrase.value.context,
      (phraseContext) =>
        nextTick(() => {
          context.value = {};
          contextSource.value = {};
          phraseContext.forEach(({ entity, tags }) => {
            context.value[entity] = new Set();
            contextSource.value[entity] = new Set(tags.split(" "));
          });
        }),
      { immediate: true }
    );
    watch(phrase, ({ blocks }) => (block.value = blocks[blocks.length - 1]), {
      immediate: true,
    });

    function addSection() {
      const s = {
        id: uuidv4(),
        name: "New section",
        phrases: [],
      };
      file.value.push(s);
      section.value = s;
    }
    function removeSection() {
      file.value.splice(toRaw(file.value).indexOf(toRaw(section.value)), 1);
      section.value = file.value[file.value.length - 1];
    }
    function addPhrase() {
      const p = {
        id: uuidv4(),
        preview: "New phrase",
        context: [],
        blocks: [],
      };
      section.value.phrases.push(p);
      phrase.value = p;
    }
    function removePhrase() {
      const phrases = toRaw(section.value.phrases);
      phrases.splice(phrases.indexOf(toRaw(phrase.value)), 1);
      phrase.value = phrases[phrases.length - 1];
    }

    function addBlock() {
      block.value = {
        states: [{ display: [{ text: "new state" }], transition: "next" }],
      };
      phrase.value.blocks.push(block.value);
    }
    function removeBlock() {
      const blocks = toRaw(phrase.value.blocks);
      const index = blocks.indexOf(toRaw(block.value));
      blocks.splice(index, 1);
      block.value = blocks[blocks.length - 1];
    }

    return {
      file,
      section,
      phrase,
      block,
      addSection,
      removeSection,
      addPhrase,
      removePhrase,
      addBlock,
      removeBlock,
    };
  },
});
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
