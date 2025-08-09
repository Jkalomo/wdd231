import { displayCards } from './utils.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('data/insurance.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

        // Display funeral and life cover cards
        const funeralLifeData = data.filter(item => item.type.includes('Funeral Cover') || item.type.includes('Life Cover'));
        displayCards(funeralLifeData, 'funeral-life-cards');

        // Populate comparison table
        const tableBody = document.getElementById('comparison-table-body');
        const features = ['Payout Amount', 'Claim Process', 'Medical Exam', 'Coverage Scope'];
        tableBody.innerHTML = features.map(feature => `
            <tr>
                <td>${feature}</td>
                <td>${getFeatureValue(data, 'Funeral Cover Basic', feature)}</td>
                <td>${getFeatureValue(data, 'Life Cover Standard', feature)}</td>
            </tr>
        `).join('');

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
        document.getElementById('funeral-life-cards').innerHTML = '<p>Error loading insurance options. Please try again later.</p>';
    }
});

function getFeatureValue(data, type, feature) {
    const item = data.find(item => item.type === type);
    switch (feature) {
        case 'Payout Amount':
            return item.benefits.split(',')[0];
        case 'Claim Process':
            return type.includes('Funeral Cover') ? 'Quick' : 'Standard';
        case 'Medical Exam':
            return type.includes('Funeral Cover') ? 'Not Required' : 'May be Required';
        case 'Coverage Scope':
            return item.features[0];
        default:
            return '';
    }
}