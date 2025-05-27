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

let isPhotoMode = true;

function loadPhoto() {
  photoLayer = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/PHOTO2/default/GoogleMapsCompatible/{z}/{y}/{x}', {
    maxNativeZoom: 20,
    maxZoom: 20,
    minZoom: 7
  }).addTo(map);
  console.info("Loaded Photo Layer");
}

function loadWorldMap() {
  return fetch("../resources/geodata/world.json")
    .then((response) => response.json())
    .then((geojsonData) => {
      var styleOptions = {}
      if (isPhotoMode) {
        styleOptions = {
          color: "#AAAAAA",
          weight: 2,
          fillColor: "#000000",
          fillOpacity: 0.3
        }
      } else {
        styleOptions = {
          weight: 0,
          fillColor: "#353535",
          fillOpacity: 1,
        }
      }
      worldLayer = L.geoJSON(geojsonData, {
        style: styleOptions
      }).addTo(map);
      console.info("Loaded World Map");
    });
}

function loadTaiwanMap() {
  return fetch("../resources/geodata/tw_area.geojson")
    .then((response) => response.json())
    .then((geojsonData) => {
      taiwanLayer = L.geoJSON(geojsonData, {
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
          weight: 5,
          opacity: 1,
        },
      }).addTo(map);
      console.info("Loaded Fault Data");
    });
}
function loadMap() {
  map.eachLayer((layer) => {
    map.removeLayer(layer);
  });
  loadWorldMap()
    .then(() => isPhotoMode ? loadPhoto() : loadTaiwanMap())
    .then(() => loadFaultData())
    .catch((error) => console.error("載入失敗：", error));
}

loadMap();

document.querySelectorAll('input[name="mapType"]').forEach((input) => {
  input.addEventListener('change', (e) => {
    const selected = e.target.value;
    isPhotoMode = (selected === "1");
    loadMap();
  });
});


L.Control.CustomControls = L.Control.extend({
  onAdd: function () {
    const container = L.DomUtil.create("div", "leaflet-bar leaflet-control-custom");

    const zoomIn = L.DomUtil.create("button", "", container);
    zoomIn.innerHTML = "+";
    zoomIn.title = "放大";
    zoomIn.onclick = () => map.zoomIn();

    const zoomOut = L.DomUtil.create("button", "", container);
    zoomOut.innerHTML = "−";
    zoomOut.title = "縮小";
    zoomOut.onclick = () => map.zoomOut();
    return container;
  },
  onRemove: function () { },
});

L.control.customControls = function (opts) {
  return new L.Control.CustomControls(opts);
};

L.control.customControls({ position: "topleft" }).addTo(map);