<template>
  <div v-if="corpus" class="section col-1">
    <div class="col-1">
      <div class="row-1">
        <toggle v-model="searching" icon="search" />
        <input
          v-if="searching"
          v-model="query"
          class="flex"
          type="text"
          placeholder="Search all phrases..."
        />
        <h2 v-else class="col-1 flex">
          <select
            v-model="section"
            style="flex: none"
            @change="select(section)"
          >
            <option v-for="s in corpus" :key="s.id" :value="s">
              {{ s.name }}
            </option>
          </select>
        </h2>
      </div>
      <div class="scroll">
        <div v-if="searching" class="col">
          <div v-for="(ps, s) of phrases" :key="s" class="col">
            <h2>{{ corpus[s].name }}</h2>
            <div class="col-0">
              <btn
                v-for="p in ps"
                :key="p"
                :text="corpus[s].phrases[p].name"
                :is-on="phrase === corpus[s].phrases[p]"
                @click="select(corpus[s], corpus[s].phrases[p])"
              />
            </div>
          </div>
        </div>
        <div v-else class="col-0">
          <btn
            v-for="p in phrases"
            :key="p.id"
            :text="p.name"
            :is-on="phrase === p"
            @click="select(null, p)"
          />
        </div>
      </div>
    </div>
    <div v-if="phrase" :key="phrase.id" class="col-1">
      <PhraseCard :phrase="phrase" />
      <PhraseCard
        v-for="(p, n) of phrasebooks"
        :key="n"
        :lect="n"
        :phrase="p[phrase.id]"
      />
    </div>
  </div>
</template>

<script lang="ts">
import PhraseCard from "./PhraseCard.vue";

import { computed, ref, watch, defineComponent, provide, nextTick } from "vue";

import { corpus, section, phrase, phrasebooks, initialize } from "./main";
import { Context, CorpusPhrase, CorpusSection } from "./types";
import { createContext } from "./utils";

export default defineComponent({
  components: { PhraseCard },
  setup() {
    initialize();

    const context = ref({} as Context);
    watch(phrase, (phrase) => createContext(context, phrase.context), {
      immediate: true,
    });

    provide("context", context);

    const searching = ref(false);
    const query = ref("");

    const phrases = computed(() =>
      searching.value
        ? corpus.value.reduce((result, section, index) => {
            result[index] = section.phrases
              .map((phrase, index) => [phrase, index] as [CorpusPhrase, number])
              .filter(([phrase]) => phrase.name.includes(query.value))
              .map(([, index]) => index);
            if (!result[index].length) delete result[index];
            return result;
          }, {} as Record<number, number[]>)
        : section.value?.phrases
    );
    function select(_section?: CorpusSection, _phrase?: CorpusPhrase) {
      if (_section) section.value = _section;
      phrase.value = _phrase ?? section.value.phrases[0];
    }

    return {
      searching,
      query,
      corpus,
      section,
      phrase,
      select,
      phrases,
      phrasebooks,
    };
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
