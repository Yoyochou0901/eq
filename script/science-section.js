const items = [
    {
        name: "地震", children: [
            { name: "震源？震央？", content: "地震相關的常見名詞解釋", img: "", url: "1-1.html" },
            { name: "P波、S波、表面波？", content: "地震波的種類", img: "", url: "1-2.html" },
            { name: "震度 5 強、6 弱，是什麼等級", content: "台灣和各國的震度分級", img: "", url: "1-3.html" },
            { name: "不要再什麼規模前都加上芮氏了", content: "地震規模的種類", img: "", url: "" },
            { name: "地震警報 快趴下！", content: "地震速報的原理", img: "", url: "" },
            { name: "直下型地震、海溝型地震？", content: "地震的類型", img: "", url: "" },
            { name: "耳鳴、地震雲？是地震的前兆嗎", content: "地震預測可行嗎", img: "", url: "" },
            { name: "距離震央近，震度越大？", content: "深層地震的不自然震度分布", img: "", url: "" },
        ]
    },
    {
        name: "海嘯", children: [
            { name: "海嘯是怎麼形成的", content: "海嘯的成因", img: "", url: "" },
            { name: "海嘯來前海水一定會後退嗎", content: "海嘯常見的迷思", img: "", url: "" },
            { name: "1 公尺的海嘯也有危險嗎", content: "海嘯的破壞力", img: "", url: "" },
            { name: "台灣也會有海嘯嗎", content: "台灣過去的海嘯紀錄和未來可能發生的海嘯", img: "", url: "" },
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
                <img src="${i.img === "" ? "../resources/science/EQ.png" : i.img}">
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

document.querySelectorAll('.section').forEach(section => {
    const content = section.querySelector('.section-content');
    const btnLeft = section.querySelector('.scroll-btn.left');
    const btnRight = section.querySelector('.scroll-btn.right');

    const updateButtons = () => {
        const scrollLeft = content.scrollLeft;
        const maxScroll = content.scrollWidth - content.clientWidth;

        btnLeft.classList.toggle('disabled', scrollLeft <= 0);
        btnRight.classList.toggle('disabled', scrollLeft >= maxScroll - 1);
    };

    btnLeft.addEventListener('click', () => {
        content.scrollBy({ left: -240, behavior: 'smooth' });
    });

    btnRight.addEventListener('click', () => {
        content.scrollBy({ left: 240, behavior: 'smooth' });
    });

    content.addEventListener('scroll', updateButtons);

    updateButtons();
});