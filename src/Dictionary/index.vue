<template>
  <div class="section col small">
    <div class="row-1 lects fill">
      <div class="col lect">
        <select v-model="queryMode" class="flex" style="font-weight: bold">
          <option value="translation">Translation</option>
          <option value="list">List</option>
          <option value="tag">Tag</option>
        </select>
        <select v-if="queryMode === 'list'" v-model="query">
          <option v-for="(l, n) in dictionaryMeta.lists" :key="n" :value="l">
            {{ n }}
          </option>
        </select>
        <template v-else>
          <input v-if="!lect" v-model="query" type="text" />
          <btn v-else icon="search" text="Search..." @click="lect = ''" />
        </template>
      </div>
      <div v-for="l in lects" :key="l" class="col card lect flag">
        <Flag :lect="l" class="blur" />
        <h2 class="flex">{{ l }}</h2>
        <input v-if="lect === l" v-model="query" type="text" />
        <btn
          v-else
          icon="search"
          :text="`Search by ${l} form...`"
          @click="lect = l"
        />
      </div>
    </div>
    <div v-for="(ind, m) of searchResult" :key="m" class="row-1 lects">
      <div class="col lect">
        <hr />
        <i class="text-faded translation">{{ m }}</i>
      </div>
      <div v-for="l in lects" :key="l" class="col lect">
        <hr />
        <EntryCard v-for="(e, i) in ind[l]" :key="i" :entry="e" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import { search, dictionaries, dictionaryMeta } from "./main";
import EntryCard from "./EntryCard.vue";
import Flag from "@/components/Flag.vue";

export default defineComponent({
  components: { EntryCard, Flag },
  setup() {
    const queries = reactive({} as Record<string, string>);
    const queryMode = ref("translation");
    const lect = ref("");
    const lects = computed(() => Object.keys(dictionaries.value));
    const query = computed({
      get: () => queries[lect.value],
      set: (q) => (queries[lect.value] = q),
    });

    const searchResult = computed(() =>
      search(
        lect.value,
        query.value
          ?.toLowerCase()
          .split(",")
          .map((q) => q.trim())
          .filter((q) => q) ?? [],
        queryMode.value
      )
    );
    return {
      dictionaries,
      lects,
      query,
      queryMode,
      lect,
      searchResult,
      dictionaryMeta,
    };
  },
});
</script>

<style lang="scss" scoped>
.translation {
  line-height: map-get($button-height, "small");
}
.section {
  $margin: map-get($margins, "normal");
  overflow-x: auto;
  padding: $margin;
  margin: -$margin;
  max-width: unset;
  width: calc(100% + 16px);
}
.lects {
  align-items: baseline;
  &.fill {
    align-items: stretch;
  }
}
.lect {
  width: 256px;
  min-width: 256px;
  &:first-child {
    width: 192px;
    min-width: 192px;
  }
}
</style>
