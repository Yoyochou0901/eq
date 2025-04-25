function loadNav(depth = 0) {
    let base = "";
    for (let i = 0; i < depth; i++) base += "../";

    const navHTML = `
    <nav>
        <ul>
            <li><a href="${base}index.html">首頁</a></li>
            <li><a href="${base}disaster-quakes/index.html">災害地震清單</a></li>
            <li><a href="${base}faults/index.html">斷層資訊</a></li>
            <li><a href="${base}preparedness.html">地震防災</a></li>
            <li><a href="${base}info.html">科普</a></li>
            <li><a href="${base}sites.html">相關網站</a></li>
        </ul>
    </nav>
    `;

    document.body.insertAdjacentHTML("afterbegin", navHTML);
}