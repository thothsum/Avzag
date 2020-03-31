<template>
  <div class="section" v-if="index">{{index.description}}</div>
</template>

<script>
export default {
  name: "Info",
  props: ["langRoot"],
  watch: {
    langRoot: {
      handler: async function(langRoot) {
        const res = await fetch(langRoot + "index.json");
        this.index = await res.json();
      },
      immediate: true
    }
  },
  data() {
    return {
      index: undefined
    };
  }
};
</script>
