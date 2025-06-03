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
  fault: null,
  jpfault: null,
  plate: null
};
let loadMapType = 0;
let faultSource = 0;
let isLoadWorldMap = true;
let isLoadJpFault = false;
let isLoadPlate = false;

function loadEsriImagery() {
  layers.google = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxNativeZoom: 20,
    maxZoom: 20,
    minZoom: 7
  }).addTo(map);
  console.info("Loaded ESRI Map")
}

function loadPhoto() {
  layers.photo = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/PHOTO2/default/GoogleMapsCompatible/{z}/{y}/{x}', {
    maxNativeZoom: 20,
    maxZoom: 20,
    minZoom: 7
  }).addTo(map);
  console.info("Loaded Photo Layer");
}

function loadWorldMap() {
  if (isLoadWorldMap && loadMapType != 0) {
    return fetch("../resources/geodata/world.json")
      .then((response) => response.json())
      .then((geojsonData) => {
        let styleOptions = {}
        if (loadMapType === 1) {
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
  } else {
    return Promise.resolve();
  }
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
            opacity: loadMapType != 2 ? 0.8 : 1,
            className: "leaflet-fault-line",
          }
        },
        onEachFeature: function (feature, layer) {
          let popup = {
            name: null,
            subtitle: null,
            condition: null,
          }
          if (feature.properties) {
            if (feature.properties.Name) {
              popup.name = feature.properties.Name;
            }
            if (faultSource === 0) {
              if (feature.properties.Type) {
                popup.subtitle = feature.properties.Type;
              }
              // if (feature.properties.Condition) {
              //   pop.condition = feature.properties.Condition;
              // }
            } else if (faultSource === 1) {
              if (feature.properties.Probability) {
                popup.condition = `<span class="condition-title">斷層種類：　</span>${feature.properties.fault_type}<br>`;
                popup.condition += `<span class="condition-title">斷層長度：　</span>${feature.properties.length}<br>`;
                popup.condition += `<span class="condition-title">規模：　　　</span>${feature.properties.magnitude}<br>`;
                popup.condition += `<span class="condition-title">未來 30 年內斷層發震機率：</span>${feature.properties.probability2}<br>`;
              }
            }
          }

          popFormat = ``;
          popFormat += `<div class="popup-title">${popup.name}</div>`;
          if (popup.subtitle) {
            popFormat += `<div class="popup-subtitle">${popup.subtitle}</div>`;
          }
          if (popup.condition) {
            popFormat += `<div class="popup-condition">${popup.condition}</div>`;
          }
          layer.bindPopup(popFormat);
        }
      }).addTo(map);
      console.info("Loaded Fault Data");
      updateLabel();
    });
}

function loadJpFault() {
  return fetch("../resources/geodata/fault_jma.geojson")
    .then((response) => response.json())
    .then((geojsonData) => {
      layers.jpfault = L.geoJSON(geojsonData, {
        style: function (feature) {
          let color = "";

          switch (feature.properties.rank.replace("*", "")) {
            case "Sランク": color = "#FF0000"; break;
            case "Aランク": color = "#FF8000"; break;
            case "Zランク": color = "#FFC900"; break;
            default: color = "#AAAAAA"; break;
          }

          return {
            color: color,
            weight: 5,
            opacity: loadMapType != 2 ? 0.8 : 1,
            className: "leaflet-fault-line",
          }
        },
        onEachFeature: function (feature, layer) {
          let popup = {
            name: null,
            subtitle: null,
            condition: null,
          }
          if (feature.properties) {
            popup.name = feature.properties.name;
            popup.subtitle = feature.properties.name1 + "<br>" + feature.properties.active;
            popup.condition = `<span class="condition-title">規模：　</span>${feature.properties.size}<br>`;
            popup.condition += `<span class="condition-title">確率：　</span>${feature.properties.rank}`;
          }

          popFormat = ``;
          popFormat += `<div class="popup-title">${popup.name}</div>`;
          if (popup.subtitle) {
            popFormat += `<div class="popup-subtitle">${popup.subtitle}</div>`;
          }
          if (popup.condition) {
            popFormat += `<div class="popup-condition">${popup.condition}</div>`;
          }
          layer.bindPopup(popFormat);
        }
      }).addTo(map);
    })
}

function loadPlate() {
  return Promise.all([
    fetch("../resources/geodata/plate1.geojson").then(res => res.json()),
    fetch("../resources/geodata/plate2.geojson").then(res => res.json())
  ]).then(([geojsonData1, geojsonData2]) => {
    layers.plate = L.layerGroup([
      L.geoJSON(geojsonData1, {
        style: {
          color: "#cccccc",
          weight: 2
        }
      }),
      L.geoJSON(geojsonData2, {
        style: {
          color: "#eeeeee",
          weight: 2
        }
      })
    ]).addTo(map);
  })
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
    .then(() => loadMapType === 0 ? loadEsriImagery() : loadMapType === 1 ? loadPhoto() : loadTaiwanMap())
    .then(() => { if (isLoadPlate) { return loadPlate() } })
    .then(() => loadFaultData())
    .then(() => { if (isLoadJpFault) { return loadJpFault() } })
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
    loadMapType = (selected === "0" ? 0 : selected === "1" ? 1 : 2);
    const cboxIsLoadWorldMap = document.getElementById("isLoadWorldMap")
    if (loadMapType === 0) {
      cboxIsLoadWorldMap.disabled = true;
    } else {
      cboxIsLoadWorldMap.disabled = false;
    }
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

let checkBoxIsLoadWorldMap = document.getElementById("isLoadWorldMap");
checkBoxIsLoadWorldMap.addEventListener('change', (e) => {
  isLoadWorldMap = checkBoxIsLoadWorldMap.checked;
  loadMap();
});

let checkBoxIsLoadJpFault = document.getElementById("isLoadJpFault");
checkBoxIsLoadJpFault.addEventListener('change', (e) => {
  isLoadJpFault = checkBoxIsLoadJpFault.checked;
  loadMap();
});

let checkBoxIsLoadPlate = document.getElementById("isLoadPlate");
checkBoxIsLoadPlate.addEventListener('change', (e) => {
  isLoadPlate = checkBoxIsLoadPlate.checked;
  loadMap();
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