<template>
  <div v-if="phrasebook" class="section col-1">
    <div class="col-1">
      <div class="row">
        <toggle v-model="searching" icon="search" />
        <input
          v-if="searching"
          v-model="query"
          class="flex"
          type="text"
          placeholder="Search all phrases..."
        />
        <h2 v-else class="col-1 flex">
          <select v-model="section" class="flex">
            <option v-for="c in corpus" :key="c.id" :value="c">
              {{ c.name }}
            </option>
          </select>
        </h2>
      </div>
      <template v-if="phrases">
        <div v-if="searching" class="col-1 scroll">
          <template v-if="searching"> </template>
          <template v-else>
            <btn
              v-for="p in corpus.phrases"
              :key="p.id"
              :is-on="phrase === p"
              @click="phrase = p"
              >{{ p.preview }}</btn
            >
          </template>
          <!-- <div v-for="(ps, s) of phrases" :key="s" class="col">
            <h2>{{ phrasebook[s].name }}</h2>
            <div class="col-0">
              <btn
                v-for="p in ps"
                :key="p"
                :is-on="phrase == phrasebook[s].phrases[p]"
                :text="phrasebook[s].phrases[p].preview"
                @click="select(s, p)"
              />
            </div>
          </div> -->
        </div>
      </template>
    </div>
    <div v-if="phrase" class="col-1">
      <PhraseCard v-model="dynamicContext" :phrase="phrase" />
      <PhraseCard
        v-for="(p, n) of phrasebooks"
        :key="n + '--' + phrase.id"
        v-model="dynamicContext"
        :lect="n"
        :phrase="p[phrase.id]"
      />
    </div>
  </div>
</template>

<script lang="ts">
import PhraseCard from "./PhraseCard.vue";

import { computed, reactive, ref, watch, defineComponent } from "vue";

import { corpus, section, phrase, phrasebooks } from "./main";
import * as Types from "./types";

export default defineComponent({
  components: { PhraseCard },
  setup() {
    const dynamicContext = ref({} as Types.DynamicContext);
    watch(phrase, (phrase) => {
      if (!phrase) return;

      dynamicContext.value =
        phrase.context.reduce((context, { entity }) => {
          context[entity] = new Set();
          return context;
        }, {} as Types.DynamicContext) ?? {};
    });

    const searching = ref(false);
    // const query = ref("");

    // const selected = reactive(
    //   JSON.parse(localStorage.phrase ?? "{ section: 0, phrase: 0 }")
    // );
    // function select(s: number, p: number) {
    //   selected.section = s;
    //   selected.phrase = p;
    // }

    // const phrases = computed(() =>
    //   searching.value
    //     ? phrasebook.value.reduce((result, section, index) => {
    //         result[index] = section.phrases
    //           .map((phrase, index) => [phrase, index] as [Types.Phrase, number])
    //           .filter(([phrase]) => phrase.preview.includes(query.value))
    //           .map(([, index]) => index);
    //         if (!result[index].length) delete result[index];
    //         return result;
    //       }, {} as Record<number, number[]>)
    //     : section.value?.phrases
    // );

    return { searching, corpus, section, phrase, phrasebooks };
  },
});
</script>

<style lang="scss" scoped>
.section {
  display: grid;
  grid-template-columns: 288px minmax(0, 1fr);
  gap: map-get($margins, "double");
  > :first-child {
    max-height: 640px;
  }
}
@media only screen and (max-width: $mobile-width) {
  .section {
    > :first-child {
      max-height: 320px;
    }
    grid-template-columns: 100%;
  }
}
</style>
