const map = L.map("map", {
  center: [23.6, 121],
  zoom: 8.25,
  minZoom: 7,
  maxZoom: 20,
  zoomControl: false,
  attributionControl: false,
  zoomSnap: 0,
  updateWhenIdle: false,
});

let layers = {
  photo: null,
  world: null,
  taiwan: null,
  fault: null
};
let isPhotoMode = true;
let faultSource = 0;

function loadPhoto() {
  layers.photo = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/PHOTO2/default/GoogleMapsCompatible/{z}/{y}/{x}', {
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
      let styleOptions = {}
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
      layers.world = L.geoJSON(geojsonData, {
        style: styleOptions
      }).addTo(map);
      console.info("Loaded World Map");
    });
}

function loadTaiwanMap() {
  return fetch("../resources/geodata/tw_area.geojson")
    .then((response) => response.json())
    .then((geojsonData) => {
      layers.taiwan = L.geoJSON(geojsonData, {
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

  const url = faultSource === 0
    ? "../resources/geodata/fault.geojson"
    : "../resources/geodata/fault2.geojson";

  return fetch(url)
    .then((response) => response.json())
    .then((geojsonData) => {
      layers.fault = L.geoJSON(geojsonData, {
        style: function (feature) {
          let color = "";
          if (faultSource === 0) {
            switch (feature.properties.Type) {
              case "第一類活動斷層":
                color = "#ff0000";
                break;
              case "第二類活動斷層":
                color = "#ff8000";
                break;
            }
          } else if (faultSource === 1) {
            switch (feature.properties.Probability) {
              case "小於3%":
                color = "#ffc900";
                break
              case "3~10%":
                color = "#ff8000";
                break
              case "10~30%":
                color = "#ff0000";
                break
              case "30%以上":
                color = "#c900ff";
                break
            }
          }

          return {
            color: color,
            weight: 5,
            opacity: 1,
          }
        },
        onEachFeature: function (feature, layer) {
          // 假設你在 geojson 中有 name 屬性
          if (feature.properties && feature.properties.Name) {
            layer.bindPopup(feature.properties.Name);
          }
        }
      }).addTo(map);
      console.info("Loaded Fault Data");
      updateLabel();
    });
}

function updateLabel() {
  const label1 = document.getElementById("label-1");
  const label2 = document.getElementById("label-2");

  if (faultSource === 0) {
    label1.classList.add("display");
  } else {
    label2.classList.add("display");
  }
}

function loadMap() {
  const labels = document.getElementsByClassName("label");
  for (let i = 0; i < labels.length; i++) {
    labels[i].classList.remove("display");
  }

  map.eachLayer((layer) => {
    map.removeLayer(layer);
  });
  loadWorldMap()
    .then(() => isPhotoMode ? loadPhoto() : loadTaiwanMap())
    .then(() => loadFaultData())
    .catch((error) => console.error("載入失敗：", error));
}

loadMap();

// TODO //
// 重構重載地圖邏輯 //
// 現行：任何變更刪除全部圖層重新 fetch //
// 構想：僅刪除變更部分圖層 //

document.querySelectorAll('input[name="mapType"]').forEach((input) => {
  input.addEventListener('change', (e) => {
    const selected = e.target.value;
    isPhotoMode = (selected === "1");
    loadMap();
  });
});

document.querySelectorAll('input[name="faultSource"]').forEach((input) => {
  input.addEventListener('change', (e) => {
    const selected = e.target.value;
    selected === "1" ? faultSource = 0 : faultSource = 1;
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