const items = [
    { name: "title", content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque, quaerat.", badge: "A", url: "#" },
    { name: "title", content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque, quaerat.", badge: "A", url: "#" },
    { name: "title", content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque, quaerat.", badge: "A", url: "#" },
    { name: "title", content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque, quaerat.", badge: "A", url: "#" },
    { name: "title", content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque, quaerat.", badge: "A", url: "#" },
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
