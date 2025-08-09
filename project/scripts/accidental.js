// scripts/accidental.js
import { displayCards, displayResources, displayFAQs } from './utils.js';

// Hamburger menu toggle
function setupHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isExpanded = navMenu.classList.contains('active');
            hamburger.setAttribute('aria-expanded', isExpanded);
            hamburger.textContent = isExpanded ? '✕' : '☰'; // Toggle icon
        });
    }
}

async function loadAccidentalData() {
    try {
        const response = await fetch('data/insurance.json');
        if (!response.ok) throw new Error('Failed to load insurance data');
        const data = await response.json();
        displayCards(data, 'accidental-cards');
    } catch (error) {
        document.getElementById('accidental-cards').innerHTML =
            '<p role="alert">Unable to load insurance options. Please try again later or contact support.</p>';
    }

    try {
        const resourcesResponse = await fetch('data/resources.json');
        if (!resourcesResponse.ok) throw new Error('Failed to load resources data');
        const resourcesData = await resourcesResponse.json();
        displayResources(resourcesData.resources, 'resources-list');
        displayFAQs(resourcesData.faqs, 'faqs-list');
    } catch (error) {
        document.getElementById('resources-list').innerHTML =
            '<p role="alert">Unable to load resources. Please try again later or contact support.</p>';
        document.getElementById('faqs-list').innerHTML =
            '<p role="alert">Unable to load FAQs. Please try again later or contact support.</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setupHamburgerMenu();
    loadAccidentalData();
});