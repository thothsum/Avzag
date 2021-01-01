import mapboxgl from "mapbox-gl";
import { nextTick } from "vue";
import Camera from "./camera";

function setupTheming(map: mapboxgl.Map) {
  function setStyle(t: string) {
    map.setStyle(`mapbox://styles/mapbox/${t}-v10`);
  }

  const query = "(prefers-color-scheme: dark)";
  if (window.matchMedia(query).matches) setStyle("dark");

  window.matchMedia(query).addEventListener("change", (e) => {
    setStyle(e.matches ? "dark" : "light");
  });
}

export default function initMap({ center, zoom }: Camera) {
  mapboxgl.accessToken = process.env.VUE_APP_MAP_TOKEN;

  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/light-v10",
    center,
    zoom,
  });

  setupTheming(map);
  window.addEventListener("resize", () =>
    nextTick(() => {
      map.resize();
    })
  );

  return map;
}
