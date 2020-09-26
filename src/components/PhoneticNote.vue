<template>
  <p class="text-caption" v-html="parsed" v-if="parsed"></p>
</template>

<script>
export default {
  name: "PhoneticNote",
  props: ["text"],
  computed: {
    parsed() {
      return this.text
        ? this.text
            .replace(/\/([^/]+)\//g, "<span class='text-ipa'>$1</span>")
            .replace(/<(.+)>/g, "<b>$1</b>")
        : "";
    },
  },
};
</script>
