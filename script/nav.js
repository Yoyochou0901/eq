function loadNav(depth = 0, now = NaN) {
    let base = "";
    for (let i = 0; i < depth; i++) base += "../";

    const navItems = [
        // { name: "首頁", url: "index.html", id: "index" },
        { name: "災害地震清單", url: "disaster-quakes/index.html", id: "quake" },
        { name: "斷層資訊", url: "faults/index.html", id: "fault" },
        { name: "地震防災", url: "preparedness.html", id: "preparedness" },
        { name: "科普", url: "science.html", id: "science" },
        { name: "相關網站", url: "sites.html", id: "sites" }
    ];

    const links = navItems.map((item) => {
        const activeClass = (item.id === now) ? ' class="now"' : "";
        return `<li><a href="${base}${item.url}"${activeClass} id="${item.id}">${item.name}</a></li>`;
    }).join("");


    const navHTML = `
    <nav>
        <a href="${base}index.html" class="icon-home">
            <img src="${base}resources/icon-home.svg" width=30px></i>
        </a>
        <ul>${links}</ul>
    </nav>
    `;

    document.body.insertAdjacentHTML("afterbegin", navHTML);
}