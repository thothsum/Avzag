<template>
  <div class="section col small">
    <div class="row-1 lects fill">
      <div class="col card lect">
        English
        <input v-if="!lect" v-model="query" type="text" />
        <btn
          v-else
          icon="search"
          :text="`Search by meaning...`"
          @click="lect = ''"
        />
      </div>
      <div v-for="(_, l) of dictionaries" :key="l" class="col card lect flag">
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
    <template v-for="(ind, m) of searchResult" :key="m">
      <hr />
      <div class="row-1 lects">
        <i class="lect text-faded">{{ m }}</i>
        <div v-for="(es, l) of ind" :key="l" class="col lect">
          <EntryCard v-for="(e, i) in es" :key="i" :entry="e" />
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import { search, dictionaries } from "./main";
import EntryCard from "./EntryCard.vue";
import Flag from "@/components/Flag.vue";

export default defineComponent({
  components: { EntryCard, Flag },
  setup() {
    const queries = reactive({} as Record<string, string>);
    const lect = ref("");
    const query = computed({
      get: () => queries[lect.value],
      set: (q) => (queries[lect.value] = q),
    });

    const searchResult = computed(() => search(lect.value, query.value));
    return { dictionaries, query, lect, searchResult };
  },
});
</script>

<style lang="scss" scoped>
.lects {
  align-items: baseline;
  &.fill {
    align-items: stretch;
  }
}
.lect {
  width: 256px;
  &:first-child {
    width: 192px;
  }
}
</style>
