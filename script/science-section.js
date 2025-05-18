const items = [
    {
        name: "地震", children: [
            { name: "震度、規模？", content: "常見名詞解釋", img: "", url: "1/1.html" },
            { name: "", content: "", img: "", url: "" },
            { name: "", content: "", img: "", url: "" },
            { name: "", content: "", img: "", url: "" },
            { name: "地震預測可行嗎", content: "", img: "", url: "" },
            { name: "", content: "", img: "", url: "" },
        ]
    },
    {
        name: "海嘯", children: [
            { name: "", content: "", img: "", url: "" },
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