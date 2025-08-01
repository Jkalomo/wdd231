document.addEventListener('DOMContentLoaded', () => {
    const attractionsGrid = document.querySelector('.attractions-grid');
    const visitMessage = document.querySelector('#visit-message');
    const loadingMessage = attractionsGrid.querySelector('.loading-message');

    console.log('Script loaded and DOM ready');

    // Load attractions from JSON
    async function loadAttractions() {
        console.log('Starting fetch for attractions...');
        try {
            const response = await fetch('./data/attractions.json'); // Relative path, adjust if needed
            console.log('Fetch response status:', response.status);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const attractions = await response.json();
            console.log('Attractions data loaded:', attractions);
            displayAttractions(attractions);
            if (loadingMessage) loadingMessage.remove(); // Remove loading message on success
        } catch (error) {
            console.error('Fetch error details:', error);
            attractionsGrid.innerHTML = `
                <div class="error-message">
                    <p>Error loading attractions: ${error.message}. Please check if data/attractions.json exists and the path is correct.</p>
                    <button onclick="location.reload()">Try Again</button>
                </div>
            `;
        }
    }

    // Display attractions in the grid
    function displayAttractions(attractions) {
        console.log('Displaying attractions:', attractions.length, 'items');
        attractionsGrid.innerHTML = '';
        attractions.forEach((attraction, index) => {
            const card = document.createElement('article');
            card.classList.add('attraction-card');
            // Remove or adjust gridArea if not needed (commented out)
            // card.style.gridArea = `card${index + 1}`; // Uncomment and adjust CSS if using named grid areas
            card.innerHTML = `
                <h2>${attraction.name}</h2>
                <figure>
                    <img src="${attraction.image}" alt="${attraction.name}" loading="lazy">
                </figure>
                <address>${attraction.address}</address>
                <p>${attraction.description}</p>
                <a href="${attraction.url || 'contact.html'}" class="btn btn-success" target="_blank" rel="noopener noreferrer" role="button">Learn More</a>
            `;
            attractionsGrid.appendChild(card);
        });
    }

    // Handle visit messages using localStorage
    function updateVisitMessage() {
        console.log('Updating visit message...');
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
        console.log('Visit message set to:', message);
    }

    // Initialize
    console.log('Initializing scripts...');
    loadAttractions();
    updateVisitMessage();
});