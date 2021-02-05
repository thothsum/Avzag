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
      <div v-if="searching" class="scroll col phrases">
        <template v-for="(ps, s) of phrases" :key="s" class="col">
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
        </template>
      </div>
      <div v-else class="scroll col-0 phrases">
        <btn
          v-for="p in phrases"
          :key="p.id"
          :text="p.name"
          :is-on="phrase === p"
          @click="select(null, p)"
        />
      </div>
    </div>
    <div v-if="phrase" :key="phrase.id" class="col-1">
      <PhraseCard :phrase="phrase" />
      <PhraseCard
        v-for="(p, n) of phrasebooks"
        :key="n"
        :lect="n"
        :path="path"
        :phrase="p[phrase.id]"
      />
    </div>
  </div>
</template>

<script lang="ts">
import PhraseCard from "./PhraseCard.vue";

import { computed, ref, watch, defineComponent, provide } from "vue";

import { corpus, section, phrase, phrasebooks, initialize } from "./main";
import { Context, CorpusPhrase, CorpusSection } from "./types";
import { createContext } from "./utils";

export default defineComponent({
  components: { PhraseCard },
  setup() {
    initialize();

    const context = ref({} as Context);
    watch(phrase, (phrase) => createContext(context, phrase?.context), {
      immediate: true,
    });
    provide("context", context);

    const searching = ref(false);
    const query = ref("");
    const path = computed(() => {
      const folders = ["phrasebook", section.value?.name, phrase.value?.name];
      return folders.every((f) => f)
        ? folders.map((f) => f + "/").join("")
        : "";
    });

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
      phrase.value = _phrase ?? section.value?.phrases[0];
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
      path,
    };
  },
});
</script>

<style lang="scss" scoped>
.section {
  display: grid;
  grid-template-columns: 288px minmax(0, 1fr);
  gap: map-get($margins, "normal");
}
.phrases {
  max-height: 640px;
}
@media only screen and (max-width: $mobile-width) {
  .section {
    grid-template-columns: 100%;
  }
  .phrases {
    max-height: 240px;
  }
}
</style>
