import { displayCards } from './utils.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('data/insurance.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

        displayCards(data, 'insurance-cards');

        // Modal handling
        const modal = document.getElementById('insurance-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        const closeModal = document.querySelector('.close-modal');

        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.dataset.id;
                const item = data.find(item => item.id == id);
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
        document.getElementById('insurance-cards').innerHTML = '<p>Error loading insurance options. Please try again later.</p>';
    }
});