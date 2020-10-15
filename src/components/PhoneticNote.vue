<template>
  <p class="text-caption" v-html="parsed" v-if="parsed"></p>
</template>

<script>
export default {
  name: "PhoneticNote",
  props: ["text"],
  computed: {
    parsed() {
      return this.text;
      // return this.text
      //       .replace(/\*(.+)\*/g, "<b>$1</b>")
      //       .replace(/_([^/]+)_/g, "<span class='text-ipa'>$1</span>");
    },
  },
};
</script>
