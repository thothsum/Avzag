<template>
  <div v-if="lects" class="section col-1">
    <ToggleGroup v-model="lect" class="small" :items="lects" />
    <div v-if="mappings" class="split">
      <div class="col">
        <div class="row">
          <Select
            v-model="sourceMapping"
            class="flex"
            :items="fullMappings"
            display="name"
          />
          <control v-if="source" icon="clear" @click="source = ''" />
          <control v-else icon="text_snippet" @click="displaySample" />
          <control icon="publish" @click="fileInput.click()" />
          <control
            v-show="!resultMapping.partial"
            icon="swap_horiz"
            @click="swap"
          />
        </div>
        <ConverterText
          v-if="sourceMapping"
          v-model="intermediate"
          :source="source"
          :mapping="sourceMapping"
        />
        <MappingTable v-if="showMappings" :mapping="sourceMapping" />
      </div>
      <div class="col">
        <div class="row">
          <Select
            v-model="resultMapping"
            class="flex"
            :items="mappings"
            display="name"
          />
          <toggle v-model="showMappings" icon="visibility" />
          <control icon="file_copy" @click="copy" />
        </div>
        <ConverterText
          v-if="sourceMapping"
          v-model="result"
          :source="intermediate"
          :mapping="resultMapping"
          :reverse="true"
        />
        <MappingTable
          v-if="showMappings"
          :mapping="resultMapping"
          :reverse="true"
        />
      </div>
    </div>
    <h2 v-else>No data for this lect.</h2>
    <input
      v-show="false"
      ref="fileInput"
      type="file"
      accept=".txt"
      @change="upload"
    />
  </div>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import Select from "@/components/Select";
import ToggleGroup from "@/components/ToggleGroup";
import MappingTable from "./MappingTable";
import ConverterText from "./ConverterText";

import { computed, ref, nextTick, watch } from "vue";
import { useStore } from "vuex";
import { Mapping } from "./types";
import convert from "./convert";

const store = useStore();
const fileInput = ref({} as HTMLInputElement);

const source = ref("");
const result = ref("");
const intermediate = ref("");

const sourceMapping = ref({} as Mapping);
const resultMapping = ref({} as Mapping);
const showMappings = ref(false);

const lects = computed(() => store.state.lects);
const lect = ref({} as any);
const converter = computed(() => lect.value.converter);
const sample = computed(() => converter.value?.sample ?? "");

const mappings = computed(() => converter.value?.mappings);
const fullMappings = computed(() =>
  mappings.value?.filter((m) =>
    m.pairs.every((a) => a === m.pairs.find((b) => b[0] === a[0]))
  )
);

function displaySample() {
  const mapping = sourceMapping.value;
  sourceMapping.value = mappings.value[converter.value.default[0]];
  source.value = sample.value;
  nextTick(() => (sourceMapping.value = mapping));
}
function swap() {
  const text = result.value;
  const mapping = sourceMapping.value;
  sourceMapping.value = resultMapping.value;
  resultMapping.value = mapping;
  source.value = text;
}
function download(filename: string, text: string) {
  const link = document.createElement("a");
  link.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  link.setAttribute("download", filename);

  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
function upload({ target }: InputEvent) {
  const reader = new FileReader();
  const file = (target as HTMLInputElement).files?.[0] as File;
  reader.onload = (e) =>
    download(
      file.name,
      convert(e.target?.result as string, sourceMapping.value.pairs)
    );
  reader.readAsText(file);
}
function copy() {
  navigator.clipboard.writeText(result.value);
}

watch(
  () => converter.value?.default ?? [0, 1],
  ([f, t]) => {
    sourceMapping.value = mappings.value[f];
    resultMapping.value = mappings.value[t];
  }
);
</script>

<style lang="scss" scoped>
.split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: map-get($margins, "double");
}
@media only screen and (max-width: $mobile-width) {
  .split {
    grid-template-columns: 100%;
  }
}
</style>
