const items = [
    {
        name: "地震", children: [
            { name: "震度、規模？", content: "常見名詞解釋", img: "", url: "1/1.html" },
            { name: "P波、S波、表面波？", content: "地震波", img: "", url: "" },
            { name: "地震速報！", content: "地震速報原理", img: "", url: "" },
            { name: "", content: "", img: "", url: "" },
            { name: "地震預測可行嗎", content: "", img: "", url: "" },
            { name: "", content: "", img: "", url: "" },
        ]
    },
    {
        name: "海嘯", children: [
            { name: "海嘯是怎麼形成的", content: "海嘯成因", img: "", url: "" },
            { name: "海嘯來前海水一定會後退嗎", content: "", img: "", url: "" },
            { name: "1 公尺的海嘯也有危險嗎", content: "海嘯的破壞力", img: "", url: "" },
            { name: "台灣也會有海嘯嗎", content: "過去的海嘯紀錄和海嘯的風險", img: "", url: "" },
        ]
    },
]

const scienceSection = document.getElementById("science-section")

items.forEach((item) => {
    const section = document.createElement("div");
    section.className = "section";

    const childrenHTML = item.children.map((i) => {
        return `
        <a href="${i.url}" class="section-child">
            <div class="item-image">
                <img src="${i.img===""?"../resources/science/EQ.png":i.img}">
            </div>
            <div class="item-title">${i.name}</div>
            <div class="item-content">${i.content}</div>
        </a>
        `;
    }).join('');


    section.innerHTML = `
    <div class="section-title">${item.name}</div>
    <div>
        <button class="scroll-btn left">
            <img src="../resources/icon-arrow-left.svg">
        </button>
        <div class="section-content">
        ${childrenHTML}
        </div>
        <button class="scroll-btn right">
            <img src="../resources/icon-arrow-right.svg">
        </button>
    </div>
    `;


    scienceSection.appendChild(section);
})