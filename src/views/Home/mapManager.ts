import mapboxgl from "mapbox-gl";
import { nextTick, onUnmounted } from "vue";

function bindCamera(map: mapboxgl.Map) {
  const camera = { center: new mapboxgl.LngLat(0, 0), zoom: 5 };

  if (localStorage.camera)
    Object.assign(camera, JSON.parse(localStorage.camera));
  onUnmounted(() => (localStorage.camera = JSON.stringify(camera)));

  map.setZoom(camera.zoom);
  map.setCenter(camera.center);

  map.on("move", () => (camera.center = map.getCenter()));
  map.on("zoom", () => (camera.zoom = map.getZoom()));
}

function bindTheme(map: mapboxgl.Map) {
  function setStyle({ matches }: MediaQueryList | MediaQueryListEvent) {
    const theme = matches ? "dark" : "light";
    map.setStyle(`mapbox://styles/mapbox/${theme}-v10`);
  }
  const query = window.matchMedia("(prefers-color-scheme: dark)");
  query.addEventListener("change", setStyle);
  setStyle(query);
}

export default function initMap(container = "map") {
  mapboxgl.accessToken = process.env.VUE_APP_MAP_TOKEN;
  const map = new mapboxgl.Map({ container, minZoom: 2, maxZoom: 10 });

  bindCamera(map);
  bindTheme(map);

  window.addEventListener("resize", () =>
    nextTick(() => {
      map.resize();
    })
  );

  return map;
}
