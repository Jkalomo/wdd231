document.addEventListener('DOMContentLoaded', () => {
    // Configuration Constants
    const CONFIG = {
        allowedImageExtensions: ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif'],
        placeholderImage: 'images/placeholder.webp',
        defaultView: 'grid',
        membershipLevels: {
            1: 'Basic',
            2: 'Silver',
            3: 'Gold'
        }
    };

    // DOM Elements
    const elements = {
        gridViewBtn: document.getElementById('gridView'),
        listViewBtn: document.getElementById('listView'),
        memberContainer: document.getElementById('memberContainer'),
        viewOptions: document.querySelector('.view-options')
    };

    // State Management
    const state = {
        members: [],
        currentView: localStorage.getItem('directoryView') || CONFIG.defaultView
    };

    // Initialize Application
    async function init() {
        setupEventListeners();
        await loadMembers();
        renderMembers();
        setInitialView();
    }

    // Data Loading
    async function loadMembers() {
        try {
            const response = await fetch('data/members.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            state.members = await response.json();
        } catch (error) {
            console.error('Failed to load members:', error);
            displayErrorMessage();
            state.members = [];
        }
    }

    // View Rendering
    function renderMembers() {
        if (!state.members.length) return;

        elements.memberContainer.innerHTML = state.members.map(member => `
            <article class="member-card" data-membership="${member.membership}">
                ${renderMemberImage(member)}
                <div class="member-content">
                    <h3>${member.name}</h3>
                    <p class="member-level">
                        ${CONFIG.membershipLevels[member.membership] || 'Basic'} Member
                    </p>
                    <address>${member.address}</address>
                    <p><a href="tel:${formatPhoneNumber(member.phone)}">${member.phone}</a></p>
                    <p><a href="${ensureUrlProtocol(member.website)}" target="_blank" rel="noopener noreferrer">Visit Website</a></p>
                    ${member.industry ? `<p class="industry">${member.industry}</p>` : ''}
                </div>
            </article>
        `).join('');
    }

    // Image Handling
    function renderMemberImage(member) {
        if (!member.image) return `<div class="no-image">No Logo Available</div>`;

        const isImage = CONFIG.allowedImageExtensions.some(ext =>
            member.image.toLowerCase().endsWith(ext)
        );

        return isImage ? `
            <img src="${member.image}" 
                 alt="${member.name} logo" 
                 loading="lazy"
                 onerror="this.onerror=null;this.src='${CONFIG.placeholderImage}';this.alt='Logo not available'">
        ` : `<div class="no-image">Invalid Image Format</div>`;
    }

    // View Management
    function setInitialView() {
        toggleView(state.currentView, false);
    }

    function toggleView(viewType, savePreference = true) {
        if (!elements.memberContainer) return;

        state.currentView = viewType;
        elements.memberContainer.className = `${viewType}-view`;

        if (elements.gridViewBtn && elements.listViewBtn) {
            elements.gridViewBtn.classList.toggle('active', viewType === 'grid');
            elements.listViewBtn.classList.toggle('active', viewType === 'list');
        }

        if (savePreference) {
            localStorage.setItem('directoryView', viewType);
        }
    }

    // Utility Functions
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
                    <button onclick="window.location.reload()">Try Again</button>
                </div>
            `;
        }
    }

    // Event Listeners
    function setupEventListeners() {
        if (elements.gridViewBtn) {
            elements.gridViewBtn.addEventListener('click', () => toggleView('grid'));
        }

        if (elements.listViewBtn) {
            elements.listViewBtn.addEventListener('click', () => toggleView('list'));
        }
    }

    // Start the application
    init();
});