<template>
  <div class="col small">
    <div v-if="expand" class="row">
      <btn icon="expand_less" @click="expand = 0" />
      <p class="flex">{{ plain }}</p>
      <btn
        icon="format_list_bulleted"
        :text="expand === 1 ? 'forms' : ''"
        :is-on="expand === 1"
        @click="expand = 1"
      />
      <btn
        icon="speaker_notes"
        :text="expand === 2 ? 'samples' : ''"
        :is-on="expand === 2"
        @click="expand = 2"
      />
    </div>
    <btn
      v-else
      class="flex"
      :is-on="expand"
      :text="plain"
      @click="expand = expand ? 0 : 1"
    />
    <div v-if="expand" class="col card">
      <template v-if="expand === 1">
        <div v-for="(f, i) in entry.forms" :key="i" class="col-0">
          <p class="row">
            <span>{{ f.text.plain }}</span>
            <span class="text-ipa">{{ f.text.ipa }}</span>
            <span>{{ f.text.glossed }}</span>
          </p>
          <p class="text-faded text-caption">{{ f.grammar }}</p>
        </div>
      </template>
      <template v-else-if="expand === 2">
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
