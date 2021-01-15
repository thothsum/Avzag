<template>
  <div v-if="corpus" class="section col-1">
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
          <select v-model="section">
            <option v-for="c in corpus" :key="c.id" :value="c">
              {{ c.name }}
            </option>
          </select>
        </h2>
      </div>
      <div class="col-0 scroll">
        <!-- <template v-if="searching"> </template> -->
        <btn
          v-for="p in section.phrases"
          :key="p.id"
          :text="p.preview"
          :is-on="phrase === p"
          @click="phrase = p"
        />
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
    </div>
    <div v-if="phrase" class="col-1">
      <PhraseCard :phrase="phrase" />
      <PhraseCard
        v-for="(p, n) of phrasebooks"
        :key="n + '--' + phrase.id"
        :lect="n"
        :phrase="p[phrase.id]"
      />
    </div>
  </div>
</template>

<script lang="ts">
import PhraseCard from "./PhraseCard.vue";

import { reactive, ref, watch, defineComponent, provide } from "vue";

import { corpus, section, phrase, phrasebooks, initialize } from "./main";
import { Context } from "./types";

export default defineComponent({
  components: { PhraseCard },
  setup() {
    initialize();

    const context = reactive({} as Context);
    watch(phrase, (phrase, oldPhrase) => {
      if (oldPhrase?.context)
        oldPhrase.context.map(({ entity }) => delete context[entity]);
      phrase.context.map(({ entity }) => (context[entity] = new Set()));
    });
    provide("context", context);

    const searching = ref(false);
    const query = ref("");

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

    return { searching, query, corpus, section, phrase, phrasebooks, context };
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
