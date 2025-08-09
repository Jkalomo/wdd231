export function displayCards(data, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = data.map(item => `
        <div class="card" data-id="${item.id}">
            <img src="${item.image}" alt="${item.type} image" loading="lazy">
            <h3>${item.type}</h3>
            <p>${item.description}</p>
            <p><strong>Provider:</strong> ${item.provider}</p>
            <p><strong>Benefits:</strong> ${item.benefits}</p>
            <p><strong>Cost:</strong> ${item.cost}</p>
        </div>
    `).join('');
}