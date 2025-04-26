function loadNav(depth = 0, now = -1) { 
    let base = "";
    for (let i = 0; i < depth; i++) base += "../";

    const navItems = [
        { name: "首頁", url: "index.html" },
        { name: "災害地震清單", url: "disaster-quakes/index.html" },
        { name: "斷層資訊", url: "faults/index.html" },
        { name: "地震防災", url: "preparedness.html" },
        { name: "科普", url: "info.html" },
        { name: "相關網站", url: "sites.html" }
    ];

    const links = navItems.map((item, i) => {
        const activeClass = (i === now) ? ' class="now"' : "";
        return `<li><a href="${base}${item.url}"${activeClass}>${item.name}</a></li>`;
    }).join("");

    const navHTML = `<nav><ul>${links}</ul></nav>`;

    document.body.insertAdjacentHTML("afterbegin", navHTML);
}