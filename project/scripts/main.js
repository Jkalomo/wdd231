import { displayCards } from './utils.js';

async function loadInsuranceData() {
    try {
        const response = await fetch('data/insurance.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        displayCards(data, 'insurance-cards');
    } catch (error) {
        // console.error('Error fetching insurance data:', error);
        document.getElementById('insurance-cards').innerHTML = '<p>Error loading insurance options. Please try again later.</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadInsuranceData);