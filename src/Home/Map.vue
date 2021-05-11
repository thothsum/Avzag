<template>
  <div ref="div" class="map">
    <slot :map="map" />
  </div>
</template>

<script lang="ts">
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import {
  defineComponent,
  onMounted,
  onUnmounted,
  PropType,
  ref,
  shallowRef,
} from "vue";
import { Lect } from "./types";
export default defineComponent({
  props: {
    catalogue: { type: Array as PropType<Lect[]>, default: () => [] },
  },
  setup() {
    const div = ref({} as HTMLElement);
    const map = shallowRef<L.Map>();

    onMounted(() => {
      map.value = L.map(div.value, {
        zoomSnap: 0.5,
        zoomControl: false,
        doubleClickZoom: false,
      }).setView([51.505, -0.09], 13);
      layer = L.tileLayer("", {
        accessToken:
          "6F94UuT7990iq8Z5yQpnbyujlm0Zr7bZkJwMshoaTEtYnsabLMp2EttcF6fCoW10",
        subdomains: "abcd",
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps',
      }).addTo(map.value);
      bindTheme();
    });

    let layer: L.TileLayer;
    function setStyle({ matches }: MediaQueryList | MediaQueryListEvent) {
      layer?.setUrl(
        `https://{s}.tile.jawg.io/jawg-${
          matches ? "dark" : "light"
        }/{z}/{x}/{y}{r}.png`
      );
    }
    function bindTheme() {
      const query = window.matchMedia("(prefers-color-scheme: dark)");
      query.addEventListener("change", setStyle);
      setStyle(query);
      onUnmounted(() => query.removeEventListener("change", setStyle));
    }

    return { div, map };
  },
});
</script>

<style lang="scss">
.map {
  width: 100vw;
  height: 100vh;
  position: absolute;
  * {
    transition: none;
    border-radius: 0;
  }
  z-index: 0;
}
</style>
