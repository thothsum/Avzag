import mapboxgl from "mapbox-gl";

export interface MarkerInfo {
  el: HTMLElement;
  point: [number, number];
}

export function attachMarkers(map: mapboxgl.Map, info: MarkerInfo[]) {
  info.forEach(({ el, point }) =>
    new mapboxgl.Marker({
      element: el,
      anchor: "top",
    })
      .setLngLat(point)
      .addTo(map)
  );
}
