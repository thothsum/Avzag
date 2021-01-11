<template>
  <div class="section col-1">
    <div class="row small">
      <control
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
          <select v-model="mappings.initial" class="flex">
            <option v-for="(m, i) in fullMappings" :key="i" :value="m">
              {{ m.name }}
            </option>
          </select>
          <control
            v-if="texts.initial"
            icon="clear"
            @click="texts.initial = ''"
          />
          <control v-else icon="text_snippet" @click="displaySample" />
          <control icon="publish" @click="fileInput.click()" />
          <control v-if="canSwap" icon="swap_horiz" @click="swap" />
        </div>
        <template v-if="pairs.initial">
          <textarea v-model="texts.initial" />
          <Pairs v-if="showPairs" :pairs="pairs.initial" />
        </template>
      </div>
      <div class="col">
        <div class="row">
          <select v-model="mappings.final" class="flex">
            <option v-for="(m, i) in converter.mappings" :key="i" :value="m">
              {{ m.name }}
            </option>
          </select>
          <toggle v-model="showPairs" icon="visibility" />
          <control icon="file_copy" @click="copy" />
        </div>
        <template v-if="pairs.final">
          <textarea v-model="texts.final" readonly />
          <Pairs v-if="showPairs" :pairs="pairs.final" />
        </template>
      </div>
    </div>
    <h2 v-else>Selected languages have no converters.</h2>
    <input
      v-show="false"
      ref="fileInput"
      type="file"
      accept=".txt"
      @change="upload"
    />
  </div>
</template>

<script lang="ts">
import Pairs from "./Pairs.vue";

import { computed, ref, nextTick, defineComponent } from "vue";
import {
  initialize,
  converter,
  converters,
  texts,
  mappings,
  pairs,
} from "./main";
import convert from "./convert";

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
      () => mappings.final && fullMappings.value?.includes(mappings.final)
    );

    const fileInput = ref({} as HTMLInputElement);
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
      reader.onload = ({ target }) => {
        if (pairs.initial)
          download(file.name, convert(target?.result as string, pairs.initial));
      };
      reader.readAsText(file);
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
      fileInput,
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
