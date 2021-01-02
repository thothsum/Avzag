<template>
  <div class="map-marker">
    <p class="icon">expand_less</p>
    <h2 :class="{ 'highlight-font': selected, faded }" @click="emit('click')">
      {{ name }}
    </h2>
  </div>
</template>

<script>
export default {
  name: "Marker",
  props: { name: String, search: Object },
  emits: ["click"],
  computed: {
    selected() {
      return this.search.selected.has(this.name);
    },
    faded() {
      return this.search.visible.size && !this.search.visible.has(this.name);
    },
  },
};
</script>
