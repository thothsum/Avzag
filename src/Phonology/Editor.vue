<template>
  <div class="section col-2 small grid">
    <EditorCard icon="view_comfy" header="Phonemes">
      <template #header>
        <ArrayControl v-model="file" v-model:item="phoneme" :add="{}" remove />
      </template>
      <div class="row wrap">
        <TableEntry
          v-for="(p, i) in file"
          :key="i"
          :selected="phoneme === p"
          :ipa="p.phoneme"
          :str="graphemes[i]"
          @click="phoneme = p"
        />
      </div>
    </EditorCard>
    <div v-if="phoneme" class="col-2 small">
      <EditorCard icon="hearing" header="Phoneme">
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
      <EditorCard header="Samples" icon="playlist_play">
        <template #header>
          <ArrayControl v-model="phoneme.samples" :add="{}" />
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
            <btn icon="clear" @click="phoneme.samples.splice(i, 1)" />
          </div>
        </template>
      </EditorCard>
    </div>
  </div>
</template>

<script lang="ts">
import ArrayControl from "@/components/ArrayControl.vue";
import EditorCard from "@/components/EditorCard.vue";
import TableEntry from "./TableEntry.vue";
import NotesEditor from "@/components/Notes/Editor.vue";

import { computed, ref, defineComponent } from "vue";
import { PhonemeUse } from "./types";
import { config, file } from "@/editor";

export default defineComponent({
  components: { ArrayControl, EditorCard, TableEntry, NotesEditor },
  setup() {
    const phoneme = ref<PhonemeUse>();
    config.value = {
      default: [],
      filename: "phonology",
    };

    const graphemes = computed(() =>
      file.value.map((f: PhonemeUse) => f.samples?.[0]?.grapheme)
    );

    return { file, phoneme, graphemes };
  },
});
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
