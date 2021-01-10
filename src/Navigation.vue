<template>
  <div id="root">
    <div class="section row-1 scroll">
      <router-link
        v-for="{ icon, text, name } in menus"
        :key="name ?? text ?? icon"
        v-slot="{ isActive, navigate }"
        custom
        :to="{ name: name ?? text }"
      >
        <control
          :icon="icon"
          :text="text"
          :is-on="isActive"
          @click="navigate"
        />
      </router-link>
    </div>
  </div>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {
      menus: [
        { icon: "arrow_back", name: "Home" },
        { icon: "audiotrack", text: "Phonology" },
        { icon: "sync_alt", text: "Converter" },
        { icon: "book", text: "Phrasebook" },
      ],
    };
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
  box-shadow: map-get($shadows, "elevated");

  :not(.icon) {
    font-weight: bold;
  }
}
</style>
