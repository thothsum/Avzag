<template>
  <div v-if="phonemes" class="section">
    <div class="col-1 scroll">
      <ToggleQuery v-model="lectQuery" :labels="lects" />
      <InputQuery
        v-model="featureQuery"
        placeholder="Query phonemes, e.g. voiced -velar..."
      />
      <div v-for="c in categories" :key="c" class="col">
        <h2>{{ c + "s" }}</h2>
        <Table
          v-model="phoneme"
          :filter="c"
          :feature-query="featureQuery"
          :lect-query="lectQuery"
          :phonemes="phonemes"
        />
      </div>
    </div>
    <Inspector :phoneme="phoneme" />
  </div>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import ToggleQuery from "@/components/Query/ToggleQuery";
import InputQuery from "@/components/Query/InputQuery";
import Table from "./Table";
import Inspector from "./Inspector";
import { computed, onUnmounted, ref, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();

const categories = ["vowel", "consonant"];
const phoneme = ref({});
const lectQuery = ref({});
const featureQuery = ref({});

const lects = computed(() => store.state.lects?.map(({ name }) => name) ?? []);
const phonemes = computed(() => store.state.phonemes ?? []);

watch(phonemes, (phonemes) => {
  const p = localStorage.phoneme;
  phoneme.value = phonemes.find(({ ipa }) => ipa === p) ?? phonemes[0];
});
onUnmounted(() => (localStorage.phoneme = phoneme.value.ipa));
</script>

<style lang="scss" scoped>
.section {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 224px;
  gap: map-get($margins, "double");
}
@media only screen and (max-width: $mobile-width) {
  .section {
    grid-template-columns: 100%;
  }
}
</style>
