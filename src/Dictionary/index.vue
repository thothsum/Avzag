<template>
  <div class="section row-2 lects small">
    <div v-for="(es, l) of entries" :key="l" class="col lect">
      <template v-if="es.length">
        <div class="col-1 card flag">
          <Flag :lect="l" class="blur" />
          <h2>{{ l }}</h2>
          <!-- <input type="text" /> -->
        </div>
        <EntryCard v-for="(e, i) in es" :key="i" :entry="e" />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { search } from "./main";
import { lects } from "@/store";
import EntryCard from "./EntryCard.vue";
import Flag from "@/components/Flag.vue";

export default defineComponent({
  components: { EntryCard, Flag },
  setup() {
    const query = ref("");
    const lect = ref("");

    const entries = computed(() => search(lect.value, query.value));

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
