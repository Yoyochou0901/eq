const quakes = [
    { title: "1906年", text: "嘉義 梅山　M7.1", url: "1906.html" },
    { title: "1920年", text: "花蓮外海　M8.2", url: "1920.html" },
    { title: "1935年", text: "苗栗 屯仔腳　M7.1", url: "1935.html" },
    { title: "1941年", text: "嘉義 中埔　M7.1", url: "1941.html" },
    { title: "1951年", text: "花東縱谷　M7.3", url: "1951.html" },
    { title: "1964年", text: "台南 白河　M6.3", url: "1964.html" },
    { title: "1999年", text: "南投 集集　M7.3", url: "1999.html" },
    { title: "2016年", text: "高雄 美濃　M6.6", url: "2016.html" },
    { title: "2024年", text: "花蓮 壽豐　M7.1", url: "2024.html" }
];

const timeline = document.getElementById("timeline");

quakes.forEach((i, n) => {
    const item = document.createElement("div");
    item.className = "timeline-item " + (n % 2 === 0 ? "right-item" : "left-item");

    item.innerHTML = `
    <a href="${i.url}" class="timeline-link">
        <div class="timeline-title">${i.title}</div>
        <div class="timeline-text">${i.text}</div>
    </a>
    `;

    timeline.appendChild(item);
});