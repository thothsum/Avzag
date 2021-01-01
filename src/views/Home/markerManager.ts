import mapboxgl from "mapbox-gl";
import { Lect, SearchState } from "./lect";

type Click = (n: string) => void;
type Map = mapboxgl.Map;
let templates = [] as HTMLElement[];

function createTemplates(lects: Lect[], onclick: Click) {
  templates = lects.map(({ name }) => {
    const icon = document.createElement("p");
    icon.className = "icon";
    icon.innerText = "expand_less";

    const header = document.createElement("h2");
    header.innerText = name;

    const div = document.createElement("div");
    div.className = "map-marker";
    div.onclick = () => onclick(name);
    div.append(icon);
    div.append(header);

    return div;
  });
  return templates;
}

function attachMarkers(map: Map, lects: Lect[]) {
  templates.forEach((t, i) => {
    new mapboxgl.Marker({
      element: t,
      anchor: "top",
    })
      .setLngLat(lects[i].coordinates)
      .addTo(map);
  });
}

export function updateVisuals({ selected, visible }: SearchState) {
  templates.forEach((t) => {
    const header = t.getElementsByTagName("h2")[0];
    const icon = t.getElementsByTagName("p")[0];

    const name = header.innerText;
    const highlighted = selected.has(name);
    const faded = visible.size && !visible.has(name);

    header.className =
      (faded ? "text-faded" : "") +
      (!faded && highlighted ? " highlight-font" : "");
    icon.className = `icon ${highlighted ? " highlight-font" : ""}`;
  });
}

export function initMarkers(map: Map, lects: Lect[], onclick: Click) {
  createTemplates(lects, onclick);
  attachMarkers(map, lects);
}
