<template>
  <div class="section col small">
    <div class="row-2 lects fill">
      <div class="col card lect">
        Search by meaning
        <input v-if="!lect" v-model="query" class="flex" type="text" />
        <div v-else><btn icon="search" @click="lect = ''" /></div>
      </div>
      <div v-for="(_, l) of dictionaries" :key="l" class="col card lect flag">
        <Flag :lect="l" class="blur" />
        <h2 class="flex">{{ l }}</h2>
        <input v-if="lect === l" v-model="query" type="text" />
        <div v-else><btn icon="search" @click="lect = l" /></div>
      </div>
    </div>
    <template v-for="(ind, m) of searchResult" :key="m">
      <hr />
      <div class="row-2 lects">
        <i class="lect text-faded">{{ m }}</i>
        <div v-for="(es, l) of ind" :key="l" class="col lect">
          <EntryCard v-for="(e, i) in es" :key="i" :entry="e" />
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { search, dictionaries } from "./main";
import EntryCard from "./EntryCard.vue";
import Flag from "@/components/Flag.vue";

export default defineComponent({
  components: { EntryCard, Flag },
  setup() {
    const query = ref("");
    const lect = ref("");

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
