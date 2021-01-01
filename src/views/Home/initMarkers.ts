import mapboxgl from "mapbox-gl";
import Lect from "./lect";

let templates = [] as HTMLElement[];

function createTemplates(lects: Lect[], emit: any) {
  templates = lects.map(({ name }, i) => {
    const icon = document.createElement("p");
    icon.className = "icon";
    icon.innerText = "expand_less";

    const header = document.createElement("h2");
    header.innerText = name;

    const div = document.createElement("div");
    div.className = "map-marker";
    div.onclick = () => emit("toggle", lects[i]);
    div.append(icon);
    div.append(header);

    return div;
  });
  return templates;
}

function attachMarkers(map: mapboxgl.Map, lects: Lect[]) {
  templates.forEach((t, i) => {
    new mapboxgl.Marker({
      element: t,
      anchor: "top",
    })
      .setLngLat(lects[i].coordinates)
      .addTo(map);
  });
}

export function updateVisuals(selected: boolean[], faded: Lect[]) {
  templates.forEach((t, i) => {
    t.getElementsByTagName("p")[0].className = `icon ${
      selected[i] ? " highlight-font" : ""
    }`;
    t.getElementsByTagName("h2")[0].className =
      (faded[i] ? "text-faded" : "") +
      (!faded[i] && selected[i] ? " highlight-font" : "");
  });
}

export function initMarkers(map: mapboxgl.Map, lects: Lect[], emit: any) {
  createTemplates(lects, emit);
  attachMarkers(map, lects);
}
