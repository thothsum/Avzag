<template>
  <div class="col small">
    <toggle v-model="expanded.card" class="card">{{
      entry.forms[0].text.plain
    }}</toggle>
    <template v-if="expanded.card">
      <h2 class="header">
        <toggle v-model="expanded.forms" text="Forms" class="flex" />
      </h2>
      <div class="col-0 card">
        <temaplate v-if="expanded.forms">
          <div v-for="(f, i) in entry.forms" :key="i" class="col-0">
            <p class="row">
              <span>{{ f.text.plain }}</span>
              <span class="text-ipa">{{ f.text.ipa }}</span>
              <span>{{ f.text.glossed }}</span>
            </p>
            <p class="text-faded text-caption">{{ f.grammar }}</p>
          </div>
        </temaplate>
      </div>
      <h2 class="header">
        <toggle v-model="expanded.samples" text="Samples" class="flex" />
      </h2>
      <div v-if="entry.samples" class="col-0 card">
        <temaplate v-if="expanded.samples">
          <div v-for="(s, i) in entry.samples" :key="i" class="col-0">
            <p>{{ s.text.plain }}</p>
            <p class="text-faded text-caption">{{ s.translation }}</p>
          </div>
        </temaplate>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from "vue";
import { Entry } from "./types";

export default defineComponent({
  name: "EntryCard",
  props: { entry: { type: Object as PropType<Entry>, default: undefined } },
  setup() {
    const expanded = reactive({ card: false, forms: false, samples: false });

    return { expanded };
  },
});
</script>
