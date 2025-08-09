import { displayCards } from './utils.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('data/insurance.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const insuranceData = await response.json();

        // Display accidental cover cards
        const accidentalData = insuranceData.filter(item => item.type.includes('Accidental Cover'));
        displayCards(accidentalData, 'accidental-cards');

        // Fetch and display resources and FAQs
        const resourcesResponse = await fetch('data/resources.json');
        if (!resourcesResponse.ok) throw new Error('Network response was not ok');
        const resourcesData = await resourcesResponse.json();

        const resourcesList = document.getElementById('resources-list');
        resourcesList.innerHTML = resourcesData.resources.map(item => `
            <div class="card">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <a href="${item.link}" target="_blank" class="cta-button">Learn More</a>
            </div>
        `).join('');

        const faqsList = document.getElementById('faqs-list');
        faqsList.innerHTML = resourcesData.faqs.map(item => `
            <div class="card">
                <h3>${item.question}</h3>
                <p>${item.answer}</p>
            </div>
        `).join('');

        // Form handling with URL Search Params
        const form = document.getElementById('quote-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const params = new URLSearchParams({
                age: formData.get('age'),
                coverType: formData.get('cover-type'),
                coverageAmount: formData.get('coverage-amount'),
                timestamp: new Date().toISOString()
            });
            localStorage.setItem('lastQuote', JSON.stringify(Object.fromEntries(params)));
            window.location.href = `quote-result.html?${params.toString()}`;
        });

        // Modal handling
        const modal = document.getElementById('insurance-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        const closeModal = document.querySelector('.close-modal');

        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.dataset.id;
                const item = insuranceData.find(item => item.id == id);
                if (item) {
                    modalTitle.textContent = item.type;
                    modalDescription.textContent = `${item.description}\n\nProvider: ${item.provider}\nBenefits: ${item.benefits}\nCost: ${item.cost}`;
                    modal.classList.add('active');
                    modal.setAttribute('aria-hidden', 'false');
                }
            });
        });

        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
        });

        // Hamburger menu
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
            hamburger.setAttribute('aria-expanded', navMenu.classList.contains('active'));
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('accidental-cards').innerHTML = '<p>Error loading insurance options. Please try again later.</p>';
    }
});