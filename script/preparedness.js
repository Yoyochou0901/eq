const items = [
    { name: "地震前該做的事", content: "地震來臨前，平時可以做的防震準備", badge: "地震", url: "#" },
    { name: "地震發生時", content: "地震發生當下，該如何應變", badge: "地震", url: "#" },
    { name: "地震後", content: "地震發生後，該注意的事", badge: "地震", url: "#" },
    { name: "海嘯防災", content: "海嘯發生時，如何應對", badge: "海嘯", url: "4.html" },
]
const preparednessSection = document.getElementById("preparedness-section")

items.forEach(item => {
    const a = document.createElement('a');
    a.className = 'card';
    a.href = item.url;

    a.innerHTML = `
        <div class="card-title">${item.name}</div>
        <div class="card-content">${item.content}</div>
        <div class="card-badge">${item.badge}</div>
    `;

    preparednessSection.appendChild(a);
});
