var map = L.map("map", {
  center: [23.5, 121],
  zoom: 8.25,
  minZoom: 6,
  maxZoom: 12,
  zoomControl: false,
  attributionControl: false,
  zoomSnap: 0,
  updateWhenIdle: false,
});

function loadWorldMap() {
  return fetch("../resources/geodata/world.json")
    .then((response) => response.json())
    .then((geojsonData) => {
      L.geoJSON(geojsonData, {
        style: {
          weight: 0,
          fillColor: "#353535",
          fillOpacity: 1,
        },
      }).addTo(map);
      console.info("Loaded World Map");
    });
}

function loadTaiwanMap() {
  return fetch("../resources/geodata/tw_area.geojson")
    .then((response) => response.json())
    .then((geojsonData) => {
      L.geoJSON(geojsonData, {
        style: {
          color: "#CCCCCC",
          weight: 1,
          opacity: 1,
          fillColor: "#353535",
          fillOpacity: 1,
        },
      }).addTo(map);
      console.info("Loaded Taiwan Map");
    });
}

function loadFaultData() {
  return fetch("../resources/geodata/fault.geojson")
    .then((response) => response.json())
    .then((geojsonData) => {
      L.geoJSON(geojsonData, {
        style: {
          color: "#FF0000",
          weight: 3,
          opacity: 1,
        },
      }).addTo(map);
      console.info("Loaded Fault Data");
    });
}

loadWorldMap()
  .then(() => loadTaiwanMap())
  .then(() => loadFaultData())
  .catch((error) => console.error("載入失敗：", error));

L.control.zoom({
  position: "bottomleft",
}).addTo(map);