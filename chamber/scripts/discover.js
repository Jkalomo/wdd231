document.addEventListener('DOMContentLoaded', () => {
    const attractionsGrid = document.querySelector('.attractions-grid');
    const visitMessage = document.querySelector('#visit-message');

    // Load attractions from JSON
    async function loadAttractions() {
        try {
            const response = await fetch('data/attractions.json');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const attractions = await response.json();
            displayAttractions(attractions);
        } catch (error) {
            attractionsGrid.innerHTML = `
                <div class="error-message">
                    <p>Error loading attractions: ${error.message}. Please check if data/attractions.json exists.</p>
                    <button onclick="location.reload()">Try Again</button>
                </div>
            `;
            console.error('Fetch error:', error);
        }
    }

    // Display attractions in the grid
    function displayAttractions(attractions) {
        attractionsGrid.innerHTML = '';
        attractions.forEach((attraction, index) => {
            const card = document.createElement('article');
            card.classList.add('attraction-card');
            card.style.gridArea = `card${index + 1}`;
            card.innerHTML = `
                <h2>${attraction.name}</h2>
                <figure>
                    <img src="${attraction.image}" alt="${attraction.name}" width="300" height="200" loading="lazy">
                </figure>
                <address>${attraction.address}</address>
                <p>${attraction.description}</p>
                <a href="contact.html" class="btn btn-success" role="button">Learn More</a>
            `;
            attractionsGrid.appendChild(card);
        });
    }

    // Handle visit messages using localStorage
    function updateVisitMessage() {
        const lastVisit = localStorage.getItem('lastVisit');
        const now = Date.now();
        const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds

        let message;
        if (!lastVisit) {
            message = 'Welcome! Let us know if you have any questions.';
        } else {
            const daysSince = Math.floor((now - parseInt(lastVisit, 10)) / oneDay);
            if (daysSince < 1) {
                message = 'Back so soon! Awesome!';
            } else {
                message = `You last visited ${daysSince} ${daysSince === 1 ? 'day' : 'days'} ago.`;
            }
        }

        visitMessage.textContent = message;
        localStorage.setItem('lastVisit', now);
    }

    // Initialize
    loadAttractions();
    updateVisitMessage();
});