<template>
  <div v-if="lects" class="section col-1">
    <ToggleGroup v-model="lect" class="small" :items="lects" />
    <div v-if="converter" class="split">
      <div class="col">
        <div class="row">
          <Select
            v-model:value="sourceMapping"
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
          v-model="intermediate"
          :source="source"
          :mapping="sourceMapping"
        />
        <MappingTable v-if="showMappings" :mapping="sourceMapping" />
      </div>
      <div class="col">
        <div class="row">
          <Select
            v-model:value="resultMapping"
            class="flex"
            :items="mappings"
            display="name"
          />
          <toggle v-model="showMappings" icon="visibility" />
          <control icon="file_copy" @click="copy" />
        </div>
        <ConverterText
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
    <a v-show="false" ref="link"></a>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import Select from "@/components/Select";
import ToggleGroup from "@/components/ToggleGroup";
import MappingTable from "./MappingTable";
import ConverterText from "./ConverterText";

import { computed, ref, nextTick, watch, watchEffect } from "vue";
import { Mapping } from "./types";
import convert from "./convert";
import { useStore } from "vuex";

const store = useStore();
const link = ref({} as HTMLLinkElement);
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

const defaultConversion = computed(() => converter.value?.default);
const mappings = computed(() => converter.value?.mappings);
const fullMappings = computed(() =>
  mappings.value?.filter((m) =>
    m.pairs.every((a) => a === m.pairs.find((b) => b[0] === a[0]))
  )
);

watch(sample, (sample) => (source.value = sample));
watch(mappings, ([f = 0, t = 1]) => {
  sourceMapping.value = mappings.value[f];
  resultMapping.value = mappings.value[t];
});
watch(defaultConversion, ([f = 0, t = 1]) => {
  sourceMapping.value = mappings.value[f];
  resultMapping.value = mappings.value[t];
});

function displaySample() {
  const mapping = sourceMapping.value;
  sourceMapping.value = mappings.value[defaultConversion.value[0]];
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
  link.value.href = "data:text/plain;charset=utf-8," + encodeURIComponent(text);
  link.value.setAttribute("donwload", filename);
  link.value.click();
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
