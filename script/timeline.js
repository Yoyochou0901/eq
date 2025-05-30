const quakes = [
    { title: "1906年", text: "嘉義梅山　規模 7.1", url: "1906.html" },
    { title: "1920年", text: "花蓮外海　規模 8.2", url: "1920.html" },
    { title: "1935年", text: "苗栗三義　規模 7.1", url: "1935.html" },
    { title: "1941年", text: "嘉義中埔　規模 7.1", url: "1941.html" },
    { title: "1951年", text: "花東縱谷　規模 7.3", url: "1951.html" },
    { title: "1964年", text: "台南白河　規模 6.3", url: "1964.html" },
    { title: "1986年", text: "花蓮外海　規模 6.8", url: "1986.html" },
    { title: "1999年", text: "南投集集　規模 7.3", url: "1999.html" },
    { title: "2002年", text: "宜蘭外海　規模 6.8", url: "2002.html" },
    { title: "2006年", text: "恆春半島　規模 7.0", url: "2006.html" },
    { title: "2016年", text: "高雄美濃　規模 6.6", url: "2016.html" },
    { title: "2022年", text: "台東池上　規模 6.8", url: "2022.html" },
    { title: "2024年", text: "花蓮壽豐　規模 7.1", url: "2024.html" }
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