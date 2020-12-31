<template>
  <div id="map" style="color: pink"></div>
  <!-- <l-map
    ref="map"
    v-model:center="camera.center"
    v-model:zoom="camera.zoom"
    :options="{ zoomControl: false }"
  >
    <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    <template v-for="(l, i) in catalogue" :key="i">
      <l-marker
        v-if="l.coordinates"
        :lat-lng="l.coordinates"
        @click="emit('toggle', l)"
      >
        <l-icon :icon-anchor="[0, 0]">
          <div class="marker" :class="'zoom-' + camera.zoom">
            <div class="icon" :class="{ selected: selected[i] }">
              expand_less
            </div>
            <h2
              :class="{
                'text-faded': faded[i],
                selected: !faded[i] && selected[i],
              }"
            >
              {{ l.name }}
            </h2>
          </div>
        </l-icon>
      </l-marker>
    </template>
  </l-map> -->
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import mapboxgl from "mapbox-gl";
import Vue, {
  computed,
  defineEmit,
  defineProps,
  PropType,
  reactive,
  ref,
  onUnmounted,
  onMounted,
  watchEffect,
  watch,
  useContext,
} from "vue";

type Point = [number, number];
interface Lect {
  name: string;
  coordinates: Point;
  family: string[];
  tags: string;
  quote: string;
}
interface Camera {
  center: Point;
  zoom: number;
}

const props = defineProps({
  catalogue: { type: Array as PropType<Lect[]>, default: [] },
  selected: { type: Array as PropType<boolean[]>, default: [] },
  visible: { type: Array as PropType<Lect[]>, default: [] },
});
const emit = defineEmit(["toggle"]);

const faded = computed(() =>
  props.visible?.length
    ? props.catalogue.map((l) => !props.visible.includes(l))
    : []
);

const camera = reactive<Camera>({ center: [0, 0], zoom: 1 });
if (localStorage.camera) Object.assign(camera, JSON.parse(localStorage.camera));
onUnmounted(() => (localStorage.camera = JSON.stringify(camera)));

let map = undefined as mapboxgl.Map | undefined;
const setupTheming = () => {
  const setStyle = (t: string) =>
    map?.setStyle(`mapbox://styles/mapbox/${t}-v10`);

  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  )
    setStyle("dark");

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      setStyle(e.matches ? "dark" : "light");
    });
};

const templates = computed(() =>
  props.catalogue.map(() => document.createElement("div"))
);
const markers = computed(() =>
  props.catalogue
    .map(
      ({ name, coordinates }, i) => `<div class="marker" class="${
        "zoom-" + camera.zoom
      }">
            <div class="icon" class="${props.selected[i] ? "selected" : ""}">
              expand_less
            </div>
            <h2
              class="${faded.value[i] ? "text-faded" : ""} ${
        !faded.value[i] && props.selected[i] ? "selected" : ""
      }"
            >
              ${name}
            </h2>
          </div>`
    )
    .map((h, i) => {
      console.log("updating markers");
      const t = templates.value[i];
      t.innerHTML = h;
      t.onclick = () => emit("toggle", props.catalogue[i]);
      return t;
    })
);
// watch(markers, () => )

window.addEventListener("resize", () => {
  console.log("sueta");
  if (map) map.resize();
});

onMounted(() => {
  mapboxgl.accessToken = process.env.VUE_APP_MAP_TOKEN;

  map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/light-v10", // stylesheet location
    center: props.catalogue[0].coordinates,
    zoom: 9,
    interactive: true,
  });
  map.resize();
  markers.value.forEach((m, i) => {
    new mapboxgl.Marker({
      element: m,
    })
      .setLngLat(props.catalogue[i].coordinates)
      .addTo(map as mapboxgl.Map);
  });

  setupTheming();
});
</script>

<style lang="scss">
.marker {
  * {
    transition: $transition;
  }
  z-index: 10;
  transform-origin: top center;
  width: fit-content;
  height: fit-content;
  text-align: center;
  line-height: 100%;
  text-shadow: map-get($shadows, "elevated");
  &:hover {
    border-color: var(--color-text);
  }
  @for $i from 1 through 13 {
    &.zoom-#{$i} {
      transform: translate(-50%) scale(#{$i * $i / 72});
    }
  }
}
.icon {
  font-size: map-get($font-sizes, "large");
}
.selected {
  color: var(--color-highlight);
}
h2 {
  padding-bottom: $border-width;
  border-bottom: $border-width dashed transparent;
  border-radius: 0;
  &:hover {
    text-decoration: 1px solid underline;
  }
}
</style>
