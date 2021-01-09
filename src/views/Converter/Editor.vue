<template>
  <div v-if="file" class="section col-2 small grid">
    <div class="col-2">
      <EditorCard button="" icon="text_snippet" header="Sample Text">
        <template #caption>
          Text that will be displayed to demonstrate the converter.
        </template>
        <textarea v-model="file.sample" />
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
        replacing text from the left with the text from the right or vise versa
        (right with left) if conversion is reversed.</template
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
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import ButtonAlert from "@/components/ButtonAlert";
import EditorCard from "@/components/EditorCard";
import Select from "@/components/Select";

import { computed, ref, Ref } from "vue";
import { Mapping, Converter } from "./types";
import { setupEditor } from "@/editorManager";

const mapping = ref({} as Mapping);
const file = setupEditor(
  { default: [0, 0], mappings: [] },
  "/converter.json",
  "editor.converter",
  () => (mapping.value = file.value.mappings[0])
) as Ref<Converter>;

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
