<template>
  <div id="root">
    <div class="section panel-horizontal">
      <button @click="navigate('Home')" class="icon">arrow_back</button>
      <button
        class="panel-horizontal"
        :class="{ highlight: $route.name === t }"
        @click="navigate(t)"
        :key="i"
        v-for="[t, i] in menus"
      >
        <span class="icon">{{i}}</span>
        <p v-if="t">{{t}}</p>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Header",
  data() {
    return {
      menus: [
        ["Phonology", "audiotrack"],
        ["Converter", "sync_alt"],
        ["Phrasebook", "chat"],
      ],
    };
  },
  methods: {
    navigate(path: string): void {
      if (this.$route.name !== path)
        this.$router.push({
          name: path,
          params: { lang: this.$route.params.lang },
        });
    },
  },
});
</script>

<style lang="scss" scoped>
#root {
  background-color: var(--color-foreground);
  margin: -1 * map-get($margins, "normal");
  margin-bottom: map-get($margins, "double");
  padding: map-get($margins, "normal");
  border-radius: 0;
  overflow: hidden;
  position: relative;
  box-shadow: map-get($shadows, "elevated");
}
button.panel-horizontal {
  font-weight: bold;
}
</style>
