<template>
  <div class="section col-2 small">
    <div class="row-2 lects fill">
      <div class="col lect">
        <h2>Avzag Dictionary</h2>
        <input v-model="query" type="text" />
      </div>
      <div v-for="(_, l) of dictionaries" :key="l" class="col lect card flag">
        <Flag :lect="l" class="blur" />
        <h2>{{ l }}</h2>
      </div>
    </div>
    <div v-for="(ind, m) of searchResult" :key="m" class="row-2 lects">
      <i class="lect">{{ m }}</i>
      <div v-for="(es, l) of ind" :key="l" class="col lect">
        <EntryCard v-for="(e, i) in es" :key="i" :entry="e" />
      </div>
    </div>
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
