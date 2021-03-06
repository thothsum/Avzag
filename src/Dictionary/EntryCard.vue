<template>
  <div class="col">
    <div v-if="expand" class="row">
      <btn icon="close" @click="expand = 0" />
      <p class="flex">{{ plain }}</p>
      <btn icon="info" :is-on="expand === 1" @click="expand = 1" />
      <btn
        icon="format_list_bulleted"
        :is-on="expand === 2"
        @click="expand = 2"
      />
      <btn icon="speaker_notes" :is-on="expand === 3" @click="expand = 3" />
    </div>
    <button
      v-else
      class="flex col-0 entry-item"
      @click="expand = expand ? 0 : 1"
    >
      <p>
        {{ plain }}
        <span class="text-faded">— {{ entry.meaning.primary }}</span>
      </p>
      <p class="text-caption text-faded">
        {{ entry.meaning.secondary }}
      </p>
    </button>
    <div v-if="expand" class="col card">
      <template v-if="expand === 1">
        <h2>Info</h2>
        <p>{{ entry.meaning.primary }}</p>
      </template>
      <template v-else-if="expand === 2">
        <h2>Forms</h2>
        <div v-for="(f, i) in entry.forms" :key="i" class="col-0">
          <p class="row-1">
            <span>{{ f.text.plain }}</span>
            <span class="text-ipa">{{ f.text.ipa }}</span>
            <span>{{ f.text.glossed }}</span>
          </p>
          <p class="text-faded text-caption">{{ f.grammar }}</p>
        </div>
      </template>
      <template v-else-if="expand === 3">
        <h2>Samples</h2>
        <div v-for="(s, i) in entry.samples" :key="i" class="col-0">
          <p>{{ s.text.plain }}</p>
          <p class="text-faded text-caption">{{ s.translation }}</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import { Entry } from "./types";

export default defineComponent({
  name: "EntryCard",
  props: { entry: { type: Object as PropType<Entry>, default: undefined } },
  setup(props) {
    const expand = ref(0);
    const plain = computed(() => props.entry.forms[0].text.plain);
    return { expand, plain };
  },
});
</script>

<style lang="scss" scoped>
.entry-item {
  align-items: normal;
}
</style>
