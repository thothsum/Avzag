<template>
  <div><div id="map" /></div>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import Lect from "./lect";
import mapboxgl from "mapbox-gl";
import {
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
  nextTick,
} from "vue";

interface Camera {
  center: [number, number];
  zoom: number;
}

const props = defineProps({
  catalogue: { type: Array as PropType<Lect[]>, default: [] },
  selected: { type: Array as PropType<boolean[]>, default: [] },
  visible: { type: Array as PropType<Lect[]>, default: [] },
});
const emit = defineEmit(["toggle"]);

const camera = reactive<Camera>({ center: [0, 0], zoom: 5 });
if (localStorage.camera) Object.assign(camera, JSON.parse(localStorage.camera));
onUnmounted(() => (localStorage.camera = JSON.stringify(camera)));

function setupTheming(map: mapboxgl.Map) {
  function setStyle(t: string) {
    map.setStyle(`mapbox://styles/mapbox/${t}-v10`);
  }

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
}

let templates = [] as HTMLElement[];
onBeforeMount(
  () =>
    (templates = props.catalogue.map(({ name }, i) => {
      const icon = document.createElement("p");
      icon.className = "icon";
      icon.innerText = "expand_less";

      const header = document.createElement("h2");
      header.innerText = name;

      const div = document.createElement("div");
      div.className = "map-marker";
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
function updateVisuals() {
  templates.forEach((t, i) => {
    if (t.children.item(0))
      t.getElementsByTagName("p")[0].className = `icon ${
        props.selected[i] ? " highlight-font" : ""
      }`;
    t.getElementsByTagName("h2")[0].className =
      (faded.value[i] ? "text-faded" : "") +
      (!faded.value[i] && props.selected[i] ? " highlight-font" : "");
  });
}
watch(
  () => faded.value,
  () => updateVisuals()
);
watch(
  () => props.selected,
  () => updateVisuals()
);

onMounted(() => {
  mapboxgl.accessToken = process.env.VUE_APP_MAP_TOKEN;
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/light-v10",
    center: camera.center,
    zoom: camera.zoom,
  });
  map.resize();
  templates.forEach((t, i) => {
    new mapboxgl.Marker({
      element: t,
      anchor: "top",
    })
      .setLngLat(props.catalogue[i].coordinates)
      .addTo(map as mapboxgl.Map);
  });

  map.on(
    "moveend",
    () => (camera.center = map.getCenter().toArray() as [number, number])
  );
  map.on("zoomend", () => (camera.zoom = map.getZoom()));

  setupTheming(map);
  window.addEventListener("resize", () =>
    nextTick(() => {
      map.resize();
    })
  );
});
</script>

<style lang="scss">
.map-marker {
  * {
    transition: $transition;
  }
  transform-origin: top center;
  width: fit-content;
  height: fit-content;
  text-align: center;
  line-height: 100%;
  text-shadow: map-get($shadows, "elevated");
  h2 {
    padding-bottom: $border-width;
    border-bottom: $border-width dashed transparent;
    border-radius: 0;
    &:hover {
      border-color: var(--color-text);
    }
  }
  p {
    font-size: map-get($font-sizes, "large");
  }
  @for $i from 1 through 13 {
    &.zoom-#{$i} {
      transform: translate(-50%) scale(#{$i * $i / 72});
    }
  }
}
</style>
