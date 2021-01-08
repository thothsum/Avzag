<template>
  <div class="section col-2 small">
    <div class="row wrap card">
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
    <div v-if="file" class="grid small">
      <div class="col-2">
        <EditorCard button="" icon="text_snippet" header="Sample Text">
          <template #caption>
            Text that will be displayed to demonstrate the converter.
          </template>
          <textarea v-model="file.sample" />
        </EditorCard>
        <EditorCard button="" icon="compare_arrows" header="Default Conversion">
          <template #caption>
            Two mappings that will be set by default. The left should be set to
            the sample's original writing system.
          </template>
          <div v-if="file.default" class="row">
            <p class="icon">south</p>
            <div class="col flex">
              <Select
                v-model:value="file.default[0]"
                :items="mappings"
                display="name"
                indexed="true"
              />
              <Select
                v-model:value="file.default[1]"
                :items="mappings"
                display="name"
                indexed="true"
              />
            </div>
          </div>
        </EditorCard>
        <EditorCard icon="call_merge" header="Mappings" @action="addMapping">
          <template v-if="mapping" #header>
            <ButtonAlert @confirm="deleteMapping" />
          </template>
          <div v-for="(m, i) in mappings" :key="i" class="row">
            <control
              :class="{ highlight: mapping == m }"
              icon="edit"
              @click="mapping = m"
            />
            <input v-model="m.name" type="text" />
          </div>
        </EditorCard>
      </div>
      <EditorCard
        v-if="mapping"
        icon="format_list_numbered"
        header="Pairs"
        @action="addPair(pairs.length)"
      >
        <template #caption>
          During conversion system will consuquently go over these pairs,
          replacing text from the left with the text from the right or vise
          versa (right with left) if conversion is reversed.</template
        >
        <template #default>
          <div v-for="(p, i) in pairs" :key="i" class="row">
            <control icon="add" @click="addPair(i)" />
            <input v-model="p[0]" type="text" placeholder="from" />
            <input v-model="p[1]" type="text" placeholder="to" />
            <control icon="clear" @click="deletePair(i)" />
          </div>
        </template>
      </EditorCard>
    </div>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import ButtonAlert from "@/components/ButtonAlert";
import EditorCard from "@/components/EditorCard";
import Select from "@/components/Select";

import { computed, onBeforeUnmount, onMounted, onUpdated, ref } from "vue";
import { useStore } from "vuex";
import { Mapping, Converter } from "./types";

const store = useStore();

const file = ref({} as Converter);
const mapping = ref({} as Mapping);

const mappings = computed(() => file.value?.mappings ?? []);
const pairs = computed(() => mapping.value.pairs ?? []);

function addMapping() {
  mapping.value = { name: "newMapping", pairs: [] };
  mappings.value.push(mapping.value);
}
function deleteMapping() {
  mappings.value.splice(mappings.value.indexOf(mapping.value), 1);
  mapping.value = mappings.value[mappings.value.length - 1];
}
function addPair(index: number) {
  mapping.value.pairs.splice(index, 0, ["", ""]);
}
function deletePair(index: number) {
  mapping.value.pairs.splice(index, 1);
}

function loadFromLect() {
  fetch(store.state.root + window.prompt("Enter lect name") + "/converter.json")
    .then((r) => r.json())
    .then((j) => {
      if (j) {
        file.value = j;
        mapping.value = file.value.mappings?.[0];
      }
    });
}
function loadFromJson() {
  const f = JSON.parse(window.prompt("Enter JSON") ?? "{}");
  if (f) {
    file.value = f;
    mapping.value = file.value.mappings?.[0];
  }
}
function saveToJson() {
  navigator.clipboard.writeText(JSON.stringify(file.value));
}
function reset() {
  file.value = { default: [0, 0], mappings: [] };
}

onMounted(() => {
  try {
    const f = JSON.parse(localStorage.cEditor);
    if (f) {
      file.value = f;
      mapping.value = file.value.mappings?.[0];
    }
    return;
  } catch (error) {
    console.log(error);
  }
  reset();
});
onUpdated(() => (localStorage.cEditor = JSON.stringify(file.value)));
onBeforeUnmount(() => (localStorage.cEditor = JSON.stringify(file.value)));
</script>

<style lang="scss" scoped>
.card {
  margin-top: -1 * map-get($margins, "double");
  padding-top: 2 * map-get($margins, "normal");
}
.grid {
  display: grid;
  grid-template-columns: 352px minmax(0, 1fr);
  gap: map-get($margins, "double");
}
@media only screen and (max-width: $mobile-width) {
  .grid {
    grid-template-columns: 100%;
  }
}
</style>
