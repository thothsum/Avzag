<template>
  <p class="text-caption" v-html="parsed" v-if="parsed"></p>
</template>

<script lang="ts">
export default {
  name: "PhoneticNote",
  props: { text: String },
  computed: {
    parsed(): string {
      return this.text
        ? this.text
            .replace(/\/([^/]+)\//g, "<span class='text-ipa'>$1</span>")
            .replace(/⟨(.+)⟩/g, "<b>$1</b>")
        : "";
    },
  },
};
</script>
