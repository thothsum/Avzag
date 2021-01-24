<template>
  <div v-if="converters" class="section col-1">
    <div v-if="Object.keys(converters).length > 1" class="row small">
      <btn
        v-for="(c, n) of converters"
        :key="n"
        class="round"
        :text="n"
        :is-on="converter === c"
        @click="converter = c"
      />
    </div>
    <div v-if="converter" class="split">
      <div class="col">
        <div class="row">
          <select v-model="mappings.initial">
            <option v-for="(m, i) in fullMappings" :key="i" :value="m">
              {{ m.name }}
            </option>
          </select>
          <btn v-if="texts.initial" icon="clear" @click="texts.initial = ''" />
          <btn v-else icon="text_snippet" @click="displaySample" />
          <btn icon="publish" @click="upload" />
          <btn v-if="canSwap" icon="swap_horiz" @click="swap" />
        </div>
        <template v-if="pairs.initial">
          <textarea v-model="texts.initial" />
          <Pairs v-if="showPairs" :pairs="pairs.initial" />
        </template>
      </div>
      <div class="col">
        <div class="row">
          <select v-model="mappings.final">
            <option v-for="(m, i) in converter.mappings" :key="i" :value="m">
              {{ m.name }}
            </option>
          </select>
          <toggle v-model="showPairs" icon="visibility" />
          <btn icon="file_copy" @click="copy" />
        </div>
        <template v-if="pairs.final">
          <textarea v-model="texts.final" readonly />
          <Pairs v-if="showPairs" :pairs="pairs.final" />
        </template>
      </div>
    </div>
    <h2 v-else>Selected languages have no converters.</h2>
  </div>
</template>

<script lang="ts">
import Pairs from "./Pairs.vue";

import { computed, ref, nextTick, defineComponent, toRaw } from "vue";
import {
  initialize,
  converter,
  converters,
  texts,
  mappings,
  pairs,
} from "./main";
import upload from "./upload";

export default defineComponent({
  components: { Pairs },
  setup() {
    initialize();

    const showPairs = ref(false);
    const fullMappings = computed(() =>
      converter.value?.mappings.filter((m) =>
        m.pairs.every((a) => a === m.pairs.find((b) => b[0] === a[0]))
      )
    );
    const canSwap = computed(
      () =>
        mappings.final && fullMappings.value?.includes(toRaw(mappings.final))
    );

    function displaySample() {
      const mapping = mappings.initial;
      mappings.initial = converter.value?.mappings[0];
      texts.initial = converter.value?.sample ?? "";
      nextTick(() => {
        mappings.initial = mapping;
      });
    }
    function swap() {
      const mapping = mappings.initial;
      mappings.initial = mappings.final;
      mappings.final = mapping;
    }
    function copy() {
      navigator.clipboard.writeText(texts.final);
    }

    return {
      converters,
      converter,
      showPairs,
      canSwap,
      swap,
      upload,
      fullMappings,
      copy,
      displaySample,
      texts,
      mappings,
      pairs,
    };
  },
});
</script>

<style lang="scss" scoped>
.split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: map-get($margins, "double");
}
textarea {
  height: 256px;
}
@media only screen and (max-width: $mobile-width) {
  .split {
    grid-template-columns: 100%;
  }
}
</style>
