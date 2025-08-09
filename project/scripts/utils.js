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
            <p><strong>Features:</strong></p>
            <ul>
                ${item.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        </div>
    `).join('');
}

export function displayResources(data, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = data.map(item => `
        <div class="resource">
            <h4>${item.title}</h4>
            <p>${item.description}</p>
            <p><strong>Source:</strong> ${item.link}</p>
        </div>
    `).join('');
}

export function displayFAQs(data, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = data.map(item => `
        <div class="faq">
            <h4>${item.question}</h4>
            <p>${item.answer}</p>
        </div>
    `).join('');
}