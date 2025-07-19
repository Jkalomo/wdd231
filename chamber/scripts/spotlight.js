// spotlight.js - Display random Gold/Silver member spotlights
document.addEventListener('DOMContentLoaded', () => {
    const spotlightContainer = document.getElementById('spotlight-container');
    if (!spotlightContainer) return;

    spotlightContainer.innerHTML = `
        <div class="loading-message">
            <div class="loading-spinner"></div>
            <p>Loading spotlights...</p>
        </div>`;

    fetch('data/members.json')
        .then(response => response.json())
        .then(members => {
            const eligibleMembers = members.filter(member => member.membership >= 2);
            const shuffled = [...eligibleMembers].sort(() => 0.5 - Math.random());
            const selectedMembers = shuffled.slice(0, Math.min(3, shuffled.length));

            spotlightContainer.innerHTML = '';
            if (selectedMembers.length === 0) {
                spotlightContainer.innerHTML = '<p class="error-message">No spotlight members available.</p>';
                return;
            }

            selectedMembers.forEach(member => {
                const card = document.createElement('article');
                card.className = `spotlight-card member-level--${member.membership === 3 ? 'gold' : 'silver'}`;
                card.setAttribute('aria-label', `${member.name}, ${member.membership === 3 ? 'Gold' : 'Silver'} Member`);
                card.innerHTML = `
                    <h3>${member.name}</h3>
                    ${member.image ? `
                        <img src="${member.image}" alt="${member.name} logo" loading="lazy" onerror="this.src='images/placeholder.webp';this.alt='Logo not available'">
                    ` : '<div class="no-image">No Logo Available</div>'}
                    <p>${member.address}</p>
                    <p><a href="tel:${member.phone}" aria-label="Call ${member.name}">${member.phone}</a></p>
                    <p><a href="${member.website.startsWith('http') ? member.website : `https://${member.website}`}" target="_blank" rel="noopener noreferrer" aria-label="Visit ${member.name} website">Visit Website</a></p>
                    <p class="membership-level">${member.membership === 3 ? 'Gold' : 'Silver'} Member</p>
                `;
                spotlightContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error loading members:', error);
            spotlightContainer.innerHTML = '<p class="error-message">Unable to load member spotlights at this time.</p>';
        });
});