var map = L.map("map", {
  center: [23.5, 121],
  zoom: 8.25,
  minZoom: 7,
  maxZoom: 20,
  zoomControl: false,
  attributionControl: false,
  zoomSnap: 0,
  updateWhenIdle: false,
});


function loadPhoto() {
  L.tileLayer('https://wmts.nlsc.gov.tw/wmts/PHOTO2/default/GoogleMapsCompatible/{z}/{y}/{x}', {
    maxNativeZoom: 20,
    maxZoom: 20,
    minZoom: 7
  }).addTo(map);
  console.info("Loaded World Map");
  return;
}

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
  // .then(() => loadTaiwanMap())
  .then(() => loadPhoto())
  .then(() => loadFaultData())
  .catch((error) => console.error("載入失敗：", error));

L.control.zoom({
  position: "bottomleft",
}).addTo(map);