document.addEventListener('DOMContentLoaded', () => {
    const directoryGrid = document.querySelector('.directory-grid');
    const gridViewBtn = document.querySelector('#grid-view');
    const listViewBtn = document.querySelector('#list-view');
    const membershipFilter = document.querySelector('#membership-filter');

    // Load members from JSON
    async function loadMembers() {
        try {
            const response = await fetch('data/members.json');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const members = await response.json();
            displayMembers(members);
            setupFilterDropdown(members);
        } catch (error) {
            directoryGrid.innerHTML = `
                <div class="error-message">
                    <p>Error loading members: ${error.message}. Please check if data/members.json exists.</p>
                    <button onclick="location.reload()">Try Again</button>
                </div>
            `;
            console.error('Fetch error:', error);
        }
    }

    // Display members in grid or list view
    function displayMembers(members) {
        directoryGrid.innerHTML = '';
        members.forEach(member => {
            const membershipLevel = member.membership === 3 ? 'Gold' : member.membership === 2 ? 'Silver' : 'Basic';
            const card = document.createElement('article');
            card.classList.add('member-card');
            card.setAttribute('data-membership', member.membership);
            card.innerHTML = `
                <h2>${member.name}</h2>
                <figure>
                    <img src="${member.image}" alt="${member.name} logo" width="200" height="100" loading="lazy">
                </figure>
                <address>${member.address}</address>
                <p>Phone: <a href="tel:${member.phone}">${member.phone}</a></p>
                <p>Website: <a href="${member.website}" target="_blank" rel="noopener noreferrer">${member.website}</a></p>
                <p>Industry: ${member.industry}</p>
                <p>Membership: ${membershipLevel}</p>
            `;
            directoryGrid.appendChild(card);
        });
    }

    // Setup filter dropdown
    function setupFilterDropdown(members) {
        membershipFilter.addEventListener('change', () => {
            const membership = membershipFilter.value;
            const filteredMembers = membership === 'all'
                ? members
                : members.filter(member => member.membership === parseInt(membership));
            displayMembers(filteredMembers);
        });
    }

    // Toggle between grid and list view
    gridViewBtn.addEventListener('click', () => {
        directoryGrid.classList.remove('list-view');
        directoryGrid.classList.add('grid-view');
        gridViewBtn.classList.add('active');
        gridViewBtn.setAttribute('aria-pressed', 'true');
        listViewBtn.classList.remove('active');
        listViewBtn.setAttribute('aria-pressed', 'false');
    });

    listViewBtn.addEventListener('click', () => {
        directoryGrid.classList.remove('grid-view');
        directoryGrid.classList.add('list-view');
        listViewBtn.classList.add('active');
        listViewBtn.setAttribute('aria-pressed', 'true');
        gridViewBtn.classList.remove('active');
        gridViewBtn.setAttribute('aria-pressed', 'false');
    });

    // Initialize
    loadMembers();
});