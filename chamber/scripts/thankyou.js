// scripts/thankyou.js - Display form data
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    document.getElementById('display-first-name').textContent = params.get('first-name') || 'N/A';
    document.getElementById('display-last-name').textContent = params.get('last-name') || 'N/A';
    document.getElementById('display-email').textContent = params.get('email') || 'N/A';
    document.getElementById('display-phone').textContent = params.get('phone') || 'N/A';
    document.getElementById('display-org-name').textContent = params.get('org-name') || 'N/A';
    document.getElementById('display-timestamp').textContent = params.get('timestamp') || 'N/A';
});