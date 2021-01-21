<template>
  <div v-if="file" class="section col-2 small grid">
    <div class="col-2">
      <EditorCard icon="topic" header="sections" @action="addSection">
        <template v-if="section" #header>
          <ArrayShift v-model="file" :item="section" />
          <p class="text-dot" />
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
          <ArrayShift v-model="section.phrases" :item="phrase" />
          <p class="text-dot" />
          <ButtonAlert @confirm="removePhrase" />
        </template>
        <div class="col scroll">
          <div v-for="p in section.phrases" :key="p.id" class="row">
            <btn icon="edit" :is-on="phrase === p" @click="phrase = p" />
            <input v-model="p.name" class="flex" type="text" />
          </div>
        </div>
      </EditorCard>
      <template v-if="phrase">
        <BlocksOrderEditor
          :key="phrase.id"
          v-model="block"
          v-model:phrase="phrase"
        />
        <ContextEditor v-if="phrase" v-model="phrase.context" />
      </template>
    </div>
    <BlockEditor v-if="block" v-model="block" />
  </div>
</template>

<script lang="ts">
import ArrayShift from "@/components/ArrayShift.vue";
import ButtonAlert from "@/components/ButtonAlert.vue";
import EditorCard from "@/components/EditorCard.vue";
import BlocksOrderEditor from "./Block/OrderEditor.vue";
import ContextEditor from "./Context/Editor.vue";
import BlockEditor from "./Block/Editor.vue";

import { defineComponent, ref, provide, watch, toRaw } from "vue";
import { v4 as uuidv4 } from "uuid";
import { setupEditor } from "@/editor";
import { State, Context, CorpusPhrase, CorpusSection, ContextSource } from "./types";
import { createContext } from "./utils";

export default defineComponent({
  components: {
    ArrayShift,
    ButtonAlert,
    EditorCard,
    BlocksOrderEditor,
    ContextEditor,
    BlockEditor,
  },
  setup() {
    const file = setupEditor<CorpusSection[]>({
      defaultFile: [],
      filename: () =>
        window.confirm("You're resetting phrasebook corpus.")
          ? "phrasebook"
          : "",
      storage: "editor.phrasebookCorpus",
    });
    const section = ref(undefined as undefined | CorpusSection);
    const phrase = ref(undefined as undefined | CorpusPhrase);
    const block = ref(undefined as undefined | State[]);
    const context = ref({} as Context);
    const contextSource = ref([] as ContextSource[]);

    provide("context", context);
    provide("contextSource", contextSource);

    watch(file, (file) => (section.value = file[file.length - 1]), {
      immediate: true,
    });
    watch(
      section,
      (section) =>
        (phrase.value = section?.phrases?.[section.phrases.length - 1]),
      { immediate: true }
    );
    watch(
      () => phrase.value?.context,
      (phraseContext) => {
        if (!phraseContext) return;
        createContext(context, phraseContext);
        createContext(contextSource, phraseContext, true);
      },
      { immediate: true }
    );

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
      if (!section.value) return;
      file.value.splice(toRaw(file.value).indexOf(toRaw(section.value)), 1);
      section.value = file.value[file.value.length - 1];
    }
    function addPhrase() {
      if (!section.value) return;
      const p: CorpusPhrase = {
        id: uuidv4(),
        name: "New phrase",
        context: [],
        blocks: [],
      };
      section.value.phrases.push(p);
      phrase.value = p;
    }
    function removePhrase() {
      if (!section.value || !phrase.value) return;
      const phrases = toRaw(section.value.phrases);
      phrases.splice(phrases.indexOf(toRaw(phrase.value)), 1);
      phrase.value = phrases[phrases.length - 1];
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
