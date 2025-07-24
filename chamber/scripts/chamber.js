// chamber.js - Handle member directory functionality for Bulawayo Chamber of Commerce
document.addEventListener('DOMContentLoaded', () => {
    const CONFIG = {
        allowedImageExtensions: ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif'],
        placeholderImage: 'images/placeholder.webp',
        defaultView: 'grid',
        membershipLevels: {
            1: 'np', // Map 'basic' to 'np' for non-profits
            2: 'silver',
            3: 'gold',
            'bronze': 'bronze' // Handle bronze explicitly
        }
    };

    const elements = {
        gridViewBtn: document.getElementById('grid-view'),
        listViewBtn: document.getElementById('list-view'),
        memberContainer: document.getElementById('members'),
        memberFilter: document.getElementById('filter-members')
    };

    const state = {
        members: [],
        currentView: localStorage.getItem('directoryView') || CONFIG.defaultView,
        currentFilter: 'all'
    };

    async function init() {
        setupEventListeners();
        await loadMembers();
        renderMembers();
        setInitialView();
    }

    async function loadMembers() {
        try {
            if (elements.memberContainer) {
                elements.memberContainer.innerHTML = `
                    <div class="loading-message">
                        <div class="loading-spinner"></div>
                        <p>Loading directory...</p>
                    </div>`;
            }
            const response = await fetch('data/members.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            state.members = await response.json();
            // Map membership levels if numeric
            state.members = state.members.map(member => ({
                ...member,
                membership: CONFIG.membershipLevels[member.membership] || member.membership || 'np'
            }));
            if (elements.memberContainer) {
                elements.memberContainer.innerHTML = ''; // Clear loading message
            }
        } catch (error) {
            console.error('Failed to load members:', error);
            displayErrorMessage();
            state.members = [];
        }
    }

    function renderMembers() {
        if (!elements.memberContainer) {
            console.error('Members container not found');
            return;
        }
        elements.memberContainer.innerHTML = '';

        const filteredMembers = state.currentFilter === 'all'
            ? state.members
            : state.members.filter(member => member.membership === state.currentFilter);

        if (filteredMembers.length === 0) {
            elements.memberContainer.innerHTML = '<p class="error-message">No members found for this category.</p>';
            return;
        }

        filteredMembers.forEach((member, index) => {
            const card = document.createElement('article');
            card.className = `member-card member-level--${member.membership}`;
            card.setAttribute('data-membership', member.membership);
            card.setAttribute('aria-label', `${member.name}, ${member.membership} Member`);
            card.style.setProperty('--index', index); // For animation delay
            card.innerHTML = `
                ${renderMemberImage(member)}
                <div class="member-content">
                    <h3>${member.name}</h3>
                    <p class="member-level">${member.membership.charAt(0).toUpperCase() + member.membership.slice(1)} Member</p>
                    <address>${member.address}</address>
                    <p><a href="tel:${formatPhoneNumber(member.phone)}" aria-label="Call ${member.name}">${member.phone}</a></p>
                    <p><a href="${ensureUrlProtocol(member.website)}" target="_blank" rel="noopener noreferrer" aria-label="Visit ${member.name} website">Visit Website</a></p>
                    ${member.description ? `<p>${member.description}</p>` : ''}
                </div>
            `;
            elements.memberContainer.appendChild(card);
        });
    }

    function renderMemberImage(member) {
        if (!member.image) return `<div class="no-image">No Logo Available</div>`;

        const isImage = CONFIG.allowedImageExtensions.some(ext => member.image.toLowerCase().endsWith(ext));
        return isImage ? `
            <img src="${member.image}" 
                 alt="${member.name} logo" 
                 loading="lazy"
                 onerror="this.onerror=null;this.src='${CONFIG.placeholderImage}';this.alt='Logo not available'">
        ` : `<div class="no-image">Invalid Image Format</div>`;
    }

    function setInitialView() {
        toggleView(state.currentView, false);
    }

    function toggleView(viewType, savePreference = true) {
        if (!elements.memberContainer) return;
        state.currentView = viewType;
        elements.memberContainer.className = `directory-container ${viewType}-view js-dependent`;
        if (elements.gridViewBtn && elements.listViewBtn) {
            elements.gridViewBtn.classList.toggle('active', viewType === 'grid');
            elements.gridViewBtn.setAttribute('aria-pressed', viewType === 'grid');
            elements.listViewBtn.classList.toggle('active', viewType === 'list');
            elements.listViewBtn.setAttribute('aria-pressed', viewType === 'list');
        }
        if (savePreference) localStorage.setItem('directoryView', viewType);
        renderMembers();
    }

    function formatPhoneNumber(phone) {
        return phone.replace(/\D/g, '');
    }

    function ensureUrlProtocol(url) {
        return url.startsWith('http') ? url : `https://${url}`;
    }

    function displayErrorMessage() {
        if (elements.memberContainer) {
            elements.memberContainer.innerHTML = `
                <div class="error-message">
                    <p>We couldn't load the member directory.</p>
                    <button type="button" aria-label="Retry loading directory">Try Again</button>
                </div>
            `;
            elements.memberContainer.querySelector('button')?.addEventListener('click', () => window.location.reload());
        }
    }

    function setupEventListeners() {
        if (elements.gridViewBtn) {
            elements.gridViewBtn.addEventListener('click', () => toggleView('grid'));
        }
        if (elements.listViewBtn) {
            elements.listViewBtn.addEventListener('click', () => toggleView('list'));
        }
        if (elements.memberFilter) {
            elements.memberFilter.addEventListener('change', (e) => {
                state.currentFilter = e.target.value;
                renderMembers();
            });
        }
    }

    init();
});