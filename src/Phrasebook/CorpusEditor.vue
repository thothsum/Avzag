<template>
  <div v-if="file" class="section col-2 small grid">
    <div class="col-2">
      <EditorCard icon="topic" header="sections">
        <template v-if="section" #header>
          <ArrayControl
            v-model="file"
            v-model:item="section"
            :add="() => ({ id: uuidv4() })"
            shift
            remove
          />
        </template>
        <div class="col scroll">
          <div v-for="(s, i) in file" :key="s.id" class="row">
            <btn icon="edit" :is-on="section === s" @click="section = s" />
            <input
              v-model="s.name"
              class="flex"
              type="text"
              :placeholder="'section #' + i"
            />
          </div>
        </div>
      </EditorCard>
      <EditorCard v-if="section" icon="short_text" header="phrases">
        <template v-if="phrase" #header>
          <ArrayControl
            v-model="section.phrases"
            v-model:item="phrase"
            :add="() => ({ id: uuidv4() })"
            shift
            remove
          />
        </template>
        <div class="col scroll">
          <div v-for="(p, i) in section.phrases" :key="p.id" class="row">
            <btn icon="edit" :is-on="phrase === p" @click="phrase = p" />
            <input
              v-model="p.name"
              class="flex"
              type="text"
              :placeholder="'phrase #' + i"
            />
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
import ArrayControl from "@/components/ArrayControl.vue";
import EditorCard from "@/components/EditorCard.vue";
import BlocksOrderEditor from "./Block/OrderEditor.vue";
import ContextEditor from "./Context/Editor.vue";
import BlockEditor from "./Block/Editor.vue";

import { defineComponent, ref, provide, watch, computed } from "vue";
import { v4 as uuidv4 } from "uuid";
import { setupEditor } from "@/editor";
import { State, Context, CorpusPhrase, CorpusSection } from "./types";
import { createContext } from "./utils";

export default defineComponent({
  components: {
    ArrayControl,
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

    const contextSource = computed(() => phrase.value?.context);
    const context = ref({} as Context);
    provide("contextSource", contextSource);
    provide("context", context);
    watch(
      contextSource,
      (contextSource) => createContext(context, contextSource),
      { immediate: true, deep: true }
    );

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
      phrase,
      (phrase) => (block.value = phrase?.blocks?.[phrase.blocks.length - 1]),
      { immediate: true }
    );

    return { file, section, phrase, block, uuidv4 };
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
