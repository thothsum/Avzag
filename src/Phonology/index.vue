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
    <div v-if="phoneme" class="col-1">
      <div class="card col-1">
        <h1 class="text-ipa">{{ phoneme.ipa }}</h1>
        <p class="text-caption text-faded text-spaced">{{ phoneme.tags }}</p>
      </div>
      <PhonemeUse v-for="(u, l) of phoneme.lects" :key="l" :lect="l" :use="u" />
    </div>
  </div>
</template>

<script lang="ts">
import ToggleQuery from "@/components/Query/ToggleQuery.vue";
import InputQuery from "@/components/Query/InputQuery.vue";
import Table from "./Table.vue";
import PhonemeUse from "./PhonemeUse.vue";

import { ref, defineComponent } from "vue";
import { initialize, lects, phonemes, phoneme } from "./main";

export default defineComponent({
  components: { ToggleQuery, InputQuery, Table, PhonemeUse },
  setup() {
    initialize();

    const categories = ["vowel", "consonant"];
    const lectQuery = ref({});
    const featureQuery = ref({});

    return {
      phonemes,
      phoneme,
      lects,
      categories,
      lectQuery,
      featureQuery,
    };
  },
});
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
