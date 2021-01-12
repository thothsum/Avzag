<template>
  <div v-if="lects && phrasebook" class="section col-1">
    <div class="col-1">
      <div class="row">
        <toggle v-model="searching" icon="search" />
        <input
          v-if="searching"
          v-model="query"
          class="flex"
          type="text"
          placeholder="Search all phrases..."
        />
        <h2 v-else class="col-1 flex">
          <Select v-model:value="section" :items="phrasebook" display="name" />
        </h2>
      </div>
      <template v-if="phrases">
        <div v-if="searching" class="col-1 scroll">
          <div v-for="(ps, s) of phrases" :key="s" class="col">
            <h2>{{ phrasebook[s].name }}</h2>
            <div class="col-0">
              <btn
                v-for="p in ps"
                :key="p"
                :class="{
                  highlight: phrase == phrasebook[s].phrases[p],
                }"
                :text="phrasebook[s].phrases[p].preview"
                @click="select(s, p)"
              />
            </div>
          </div>
        </div>
        <List
          v-else
          v-model:value="phrase"
          class="scroll"
          :items="phrases"
          display="preview"
        />
      </template>
    </div>
    <div v-if="phrase" class="col-1">
      <div class="row scroll small">
        <toggle
          v-model="options.notes"
          class="round"
          icon="sticky_note_2"
          text="Notes"
        />
        <toggle
          v-model="options.source"
          class="round"
          icon="short_text"
          text="Source"
        />
        <toggle
          v-model="options.interactive"
          class="round"
          icon="tune"
          text="Interactive"
        />
        <toggle
          v-model="options.glossed"
          class="round"
          icon="layers"
          text="Glossed"
        />
      </div>
      <div v-show="showSource" class="col-1 wrap card">
        <Context v-if="interactive" :context="context" />
        <div class="row wrap">
          <Block
            v-for="(b, i) in phrase.blocks"
            :id="selected"
            :key="i"
            v-model:context="dynamicContext"
            :interactive="options.interactive"
            :block="b"
          />
        </div>
      </div>
      <PhraseTranslation
        v-for="(t, i) in translations"
        :id="selected"
        :key="i"
        v-model:context="dynamicContext"
        :lect="lects[i].name"
        :options="options"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Select from "@/components/Select";
import List from "@/components/List";
import Context from "./Context";
import Block from "./Block";
import PhraseTranslation from "./PhraseTranslation";

import { computed, reactive, ref, watch, watchEffect } from "vue";
import * as Types from "./types";

const section = ref({} as Types.Section);
const phrase = ref({} as Types.Phrase);
const dynamicContext = ref({} as Types.DynamicContext);
const options = reactive({ source: true } as Types.PhraseTranslationOptions);
const searching = ref(false);
const query = ref("");

const lects = computed(() => [] /* store.state.lects */);
const phrasebook = computed(() => [] /* store.state.phrasebook */);

const selected = reactive(
  JSON.parse(localStorage.phrase ?? "{ section: 0, phrase: 0 }")
);
watchEffect(() => {
  localStorage.phrase = JSON.stringify(selected);
  section.value = phrasebook.value[selected.section];
  phrase.value = section.value.phrases[selected.phrase];
});
function select(s: number, p: number) {
  selected.section = s;
  selected.phrase = p;
}

const phrases = computed(() =>
  searching.value
    ? phrasebook.value.reduce((result, section, index) => {
        result[index] = section.phrases
          .map((phrase, index) => [phrase, index] as [Types.Phrase, number])
          .filter(([phrase]) => phrase.preview.includes(query.value))
          .map(([, index]) => index);
        if (!result[index].length) delete result[index];
        return result;
      }, {} as Record<number, number[]>)
    : section.value?.phrases
);
const translations = computed(() =>
  lects.value.map(({ phrasebook }) =>
    phrasebook ? phrasebook[phrase.value.id] : null
  )
);

watch(
  phrase,
  ({ context }) => {
    dynamicContext.value =
      context.reduce((context, { entity }) => {
        context[entity] = new Set();
        return context;
      }, {} as Types.DynamicContext) ?? {};
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.section {
  display: grid;
  grid-template-columns: 288px minmax(0, 1fr);
  gap: map-get($margins, "double");
  > :first-child {
    max-height: 640px;
  }
}
@media only screen and (max-width: $mobile-width) {
  .section {
    > :first-child {
      max-height: 320px;
    }
    grid-template-columns: 100%;
  }
}
</style>
