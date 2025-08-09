import { displayCards, displayResources, displayFAQs } from './utils.js';

async function loadAccidentalData() {
    try {
        const response = await fetch('data/insurance.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        displayCards(data, 'accidental-cards');
    } catch (error) {
        // console.error('Error fetching insurance data:', error);
        document.getElementById('accidental-cards').innerHTML = '<p>Error loading insurance options. Please try again later.</p>';
    }

    try {
        const resourcesResponse = await fetch('data/resources.json');
        if (!resourcesResponse.ok) throw new Error('Network response was not ok');
        const resourcesData = await resourcesResponse.json();
        displayResources(resourcesData.resources, 'resources-list');
        displayFAQs(resourcesData.faqs, 'faqs-list');
    } catch (error) {
        // console.error('Error fetching resources data:', error);
        document.getElementById('resources-list').innerHTML = '<p>Error loading resources. Please try again later.</p>';
        document.getElementById('faqs-list').innerHTML = '<p>Error loading FAQs. Please try again later.</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadAccidentalData);