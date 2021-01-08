<template>
  <div class="section col-2 small">
    <div class="row wrap small card">
      <router-link to="/home">Home</router-link>
      <p class="text-dot" />
      <router-link to="/editor/phonology">Phonology</router-link>
      <router-link to="/editor/converter">Converter</router-link>
      <router-link to="/editor/phrasebook">Phrasebook</router-link>
      <router-link to="/editor/phrasebook/corpus">
        Phrasebook Corpus
      </router-link>
      <control text="load from lect" @click="loadFromLect" />
      <control text="load from JSON" @click="loadFromJson" />
      <control text="save JSON to clipboard" @click="saveToJson" />
      <ButtonAlert text="Reset" @confirm="reset" />
    </div>
    <div class="grid">
      <EditorCard icon="view_comfy" header="Phonemes" @action="addPhoneme">
        <div class="row wrap">
          <TableEntry
            v-for="(p, i) in file"
            :key="i"
            :selected="phoneme == p"
            :ipa="p.phoneme"
            :str="graphemes[i]"
            @click="phoneme = p"
          />
        </div>
      </EditorCard>
      <div v-if="phoneme" class="col-2 small">
        <EditorCard button="" icon="hearing" header="Phoneme">
          <template #header><ButtonAlert @confirm="removePhoneme" /></template>
          <input
            v-model="phoneme.phoneme"
            type="text"
            class="text-ipa"
            placeholder="phoneme"
          />
        </EditorCard>
        <NotesEditor v-model="phoneme.notes">
          You can add notes to clarify certain use cases or to give some
          additional info.
        </NotesEditor>
        <EditorCard header="Samples" icon="playlist_play" @action="addSample">
          <template #caption>
            Use cases of the phoneme within the language, defined by a letter, a
            word, and the word's ipa.
          </template>
          <template #default>
            <div v-for="(s, i) in phoneme.samples" :key="i" class="row sample">
              <input v-model="s.grapheme" type="text" placeholder="grapheme" />
              <input
                v-model="s.word"
                class="flex"
                type="text"
                placeholder="word"
              />
              <input
                v-model="s.ipa"
                class="flex text-ipa"
                type="text"
                placeholder="ipa"
              />
              <control icon="clear" @click="removeSample(i)" />
            </div>
          </template>
        </EditorCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import ButtonAlert from "@/components/ButtonAlert";
import EditorCard from "@/components/EditorCard";
import TableEntry from "./TableEntry";
import NotesEditor from "@/components/Notes/Editor";

import { computed, onBeforeUnmount, onMounted, onUpdated, ref } from "vue";
import { PhonemeUse } from "./types";
import { useStore } from "vuex";

const store = useStore();

const file = ref([] as PhonemeUse[]);
const phoneme = ref({} as PhonemeUse);

const graphemes = computed(() =>
  file.value.map((p) => p?.samples?.[0].grapheme)
);

function loadFromLect() {
  fetch(store.state.root + window.prompt("Enter lect name") + "/phonology.json")
    .then((r) => r.json())
    .then((j) => {
      if (j) {
        file.value = j;
        phoneme.value = file.value[0];
      }
    });
}
function loadFromJson() {
  const f = JSON.parse(window.prompt("Enter JSON") ?? "{}");
  if (f) {
    file.value = f;
    phoneme.value = file.value[0];
  }
}
function saveToJson() {
  navigator.clipboard.writeText(JSON.stringify(file.value));
}
function reset() {
  file.value = [];
  phoneme.value = file.value[0];
}

onMounted(() => {
  try {
    const f = JSON.parse(localStorage.pEditor);
    if (f) file.value = f;
    return;
  } catch (error) {
    console.log(error);
  }
  reset();
});
onUpdated(() => (localStorage.pEditor = JSON.stringify(file.value)));
onBeforeUnmount(() => (localStorage.pEditor = JSON.stringify(file.value)));

function addPhoneme() {
  const p = { phoneme: "new" } as PhonemeUse;
  file.value.push(p);
  phoneme.value = p;
}
function removePhoneme() {
  const i = file.value.indexOf(phoneme.value);
  file.value.splice(i, 1);
  phoneme.value = file.value[file.value.length - 1];
}

function addSample() {
  if (phoneme.value.samples) phoneme.value.samples.push({});
  else phoneme.value.samples = [{}];
}
function removeSample(index: number) {
  if (phoneme.value.samples) phoneme.value.samples.splice(index, 1);
}
</script>

<style lang="scss" scoped>
.card {
  margin-top: -1 * map-get($margins, "double");
  padding-top: 2 * map-get($margins, "normal");
}
.grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 352px;
  gap: map-get($margins, "double");
}
.sample input {
  width: 64px;
}
@media only screen and (max-width: $mobile-width) {
  .grid {
    grid-template-columns: 100%;
  }
}
</style>
