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
  onBeforeMount,
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

const camera = { center: [0, 0], zoom: 1 } as Camera;
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

window.addEventListener("resize", () => {
  console.log("resizing");
  if (map) map.resize();
});

let templates = [] as HTMLElement[];
onBeforeMount(
  () =>
    (templates = props.catalogue.map(({ name }, i) => {
      const icon = document.createElement("p");
      icon.className = "icon";
      icon.innerText = "expand_less";

      const header = document.createElement("h2");

      const div = document.createElement("div");
      div.className = "marker";
      div.onclick = () => emit("toggle", props.catalogue[i]);
      div.append(icon);
      div.append(header);

      return div;
    }))
);

const faded = computed(() =>
  props.visible?.length
    ? props.catalogue.map((l) => !props.visible.includes(l))
    : []
);
watchEffect(() =>
  templates.forEach((t, i) => {
    console.log("updating markers");
    if (t.children.item(0))
      t.getElementsByTagName("p")[0].className = `icon ${
        props.selected[i] ? " selected" : ""
      }`;
    t.getElementsByTagName("h2")[0].className =
      (faded.value[i] ? "text-faded" : "") +
      (!faded.value[i] && props.selected[i] ? " selected" : "");
  })
);

onMounted(() => {
  mapboxgl.accessToken = process.env.VUE_APP_MAP_TOKEN;

  map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/light-v10",
    center: props.catalogue[0].coordinates,
    zoom: 9,
  });
  map.resize();
  templates.forEach((t, i) => {
    new mapboxgl.Marker({
      element: t,
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
