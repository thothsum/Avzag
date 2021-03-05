<template>
  <div class="section col-2">
    <div class="row">
      <h2>
        <select v-model="lect">
          <option value="">English</option>
          <option v-for="l in lects" :key="l" :value="l">
            {{ l }}
          </option>
        </select>
      </h2>
      <input v-model="query" type="text" />
    </div>
    <div class="row-2 lects">
      <div v-for="(es, l) of entries" :key="l" class="col-2 lect">
        <h2>{{ l }}</h2>
        <EntryCard v-for="(e, i) in es" :key="i" :entry="e" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { dictionaries } from "./main";
import { lects } from "@/store";
import { Entry } from "./types";
import EntryCard from "./EntryCard.vue";

export default defineComponent({
  components: { EntryCard },
  setup() {
    const query = ref("");
    const lect = ref("");

    const entries = computed(() =>
      Object.entries(query.value ? dictionaries.value : {})
        .filter(([, d]) => d)
        .reduce((entries, [lect, dictionary]) => {
          entries[lect] = dictionary.filter(({ meaning }) =>
            meaning.primary.includes(query.value)
          );
          return entries;
        }, {} as Record<string, Entry[]>)
    );

    return { query, entries, lects, lect };
  },
});
</script>

<style lang="scss" scoped>
.lects {
  align-items: baseline;
}
.lect {
  width: 320px;
}
</style>
