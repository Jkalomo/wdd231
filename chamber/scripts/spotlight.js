document.addEventListener('DOMContentLoaded', () => {
    const spotlightContainer = document.getElementById('spotlight-container');

    fetch('data/members.json')
        .then(response => response.json())
        .then(members => {
            // Filter for Gold and Silver members
            const eligibleMembers = members.filter(member => member.membership >= 2);

            // Randomly select 2-3 members
            const shuffled = [...eligibleMembers].sort(() => 0.5 - Math.random());
            const selectedMembers = shuffled.slice(0, Math.min(3, shuffled.length));

            // Display spotlight cards
            selectedMembers.forEach(member => {
                const card = document.createElement('div');
                card.className = 'spotlight-card';
                card.innerHTML = `
                    <h3>${member.name}</h3>
                    ${member.image ? `<img src="${member.image}" alt="${member.name} logo" loading="lazy">` : ''}
                    <p>${member.address}</p>
                    <p><a href="tel:${member.phone}">${member.phone}</a></p>
                    <p><a href="${member.website.startsWith('http') ? member.website : `https://${member.website}`}" target="_blank">Visit Website</a></p>
                    <p class="membership-level">${member.membership === 3 ? 'Gold' : 'Silver'} Member</p>
                `;
                spotlightContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error loading members:', error);
            spotlightContainer.innerHTML = '<p>Unable to load member spotlights at this time.</p>';
        });
});