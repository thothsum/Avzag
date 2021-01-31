<template>
  <div v-if="file && corpus" class="section col-2 small grid">
    <div class="col-2">
      <div class="col">
        <div class="col">
          <div class="row">
            <p class="icon">topic</p>
            <h2 class="col flex">
              <select v-model="section">
                <option v-for="s in corpus" :key="s.name" :value="s">
                  {{ s.name }}
                </option>
              </select>
            </h2>
          </div>
          <div v-if="section" class="row">
            <p class="icon">short_text</p>
            <select v-model="phrase">
              <option v-for="p in section.phrases" :key="p.id" :value="p">
                {{ p.name }}
              </option>
            </select>
            <btn icon="fingerprint" @click="copyId" />
          </div>
        </div>
        <hr />
        <p class="text-faded text-caption">
          The source corpus is loading from what is saved on Phrasebook Corpus
          editor page.
        </p>
        <VContext />
        <div v-if="phrase" :key="phrase.id" class="row wrap flex">
          <Block v-for="(b, i) in phrase.blocks" :key="i" :block="b" />
        </div>
      </div>
      <template v-if="translation">
        <BlocksOrderEditor
          :key="phrase?.id"
          v-model="block"
          v-model:phrase="translation"
        />
        <NotesEditor v-model="translation.notes">
          You can add notes, for example, to explain certain grammatical rules.
        </NotesEditor>
        <ContextTranslationEditor v-model="translation.context" />
      </template>
    </div>
    <BlockEditor v-if="block" v-model="block" />
  </div>
</template>

<script lang="ts">
import NotesEditor from "@/components/Notes/Editor.vue";
import VContext from "./Context/index.vue";
import Block from "./Block/index.vue";
import BlocksOrderEditor from "./Block/OrderEditor.vue";
import BlockEditor from "./Block/Editor.vue";
import ContextTranslationEditor from "./Context/TranslationEditor.vue";

import { defineComponent, ref, watch, provide, computed } from "vue";
import { loadJSON } from "@/store";
import { setupEditor } from "@/editor";
import {
  State,
  Context,
  CorpusPhrase,
  CorpusSection,
  Phrase,
  Phrasebook,
} from "./types";
import { createContext } from "./utils";

export default defineComponent({
  components: {
    VContext,
    Block,
    NotesEditor,
    BlocksOrderEditor,
    BlockEditor,
    ContextTranslationEditor,
  },
  setup() {
    const corpus = ref([] as CorpusSection[]);
    try {
      corpus.value = JSON.parse(localStorage["editor.phrasebookCorpus"]);
    } catch {
      loadJSON("phrasebook").then((j) => (corpus.value = j));
    }
    const section = ref(undefined as undefined | CorpusSection);
    const phrase = ref(undefined as undefined | CorpusPhrase);
    const translation = ref({} as Phrase);
    const block = ref(undefined as undefined | State[]);
    const file = setupEditor<Phrasebook>({
      defaultFile: {},
      filename: "phrasebook",
      storage: "editor.phrasebook",
    });

    const contextSource = computed(() => phrase.value?.context);
    const context = ref({} as Context);
    provide("contextSource", contextSource);
    provide("context", context);
    watch(
      contextSource,
      (contextSource) => createContext(context, contextSource),
      { immediate: true }
    );

    watch(corpus, (corpus) => (section.value = corpus[corpus.length - 1]), {
      immediate: true,
    });
    watch(
      section,
      (section) => {
        if (section?.phrases)
          phrase.value = section.phrases[section.phrases.length - 1];
      },
      { immediate: true }
    );
    watch(
      [phrase, file],
      ([phrase]) => {
        if (!phrase) return;
        if (!file.value[phrase.id]) file.value[phrase.id] = { blocks: [] };
        translation.value = file.value[phrase.id];
      },
      { immediate: true }
    );
    watch(
      translation,
      (translation) =>
        (block.value = translation?.blocks?.[translation.blocks.length - 1]),
      { immediate: true }
    );

    function copyId() {
      if (phrase.value) navigator.clipboard.writeText(phrase.value.id);
    }

    return {
      file,
      corpus,
      section,
      phrase,
      translation,
      block,
      copyId,
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
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 1.5fr);
  gap: map-get($margins, "double");
}
@media only screen and (max-width: $mobile-width) {
  .grid {
    grid-template-columns: 100%;
  }
}
</style>
