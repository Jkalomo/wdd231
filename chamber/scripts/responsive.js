document.addEventListener('DOMContentLoaded', () => {
    console.log('Responsive.js loaded at', new Date().toLocaleString());
    const menuButton = document.querySelector('#menu');
    const nav = document.querySelector('#nav');

    if (!menuButton) {
        console.error('Error: Menu button (#menu) not found in DOM');
        return;
    }
    if (!nav) {
        console.error('Error: Navigation (#nav) not found in DOM');
        return;
    }

    console.log('Menu button and nav found. Setting up click event listener.');
    menuButton.addEventListener('click', () => {
        const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
        console.log('Menu clicked. Current aria-expanded:', isExpanded);
        menuButton.setAttribute('aria-expanded', !isExpanded);
        nav.classList.toggle('show');
        console.log('Nav classList after toggle:', nav.classList.toString());
        console.log('Nav display style:', window.getComputedStyle(nav).display);
    });

    // Fallback: Check if nav is visible on larger screens
    window.addEventListener('resize', () => {
        console.log('Window resized. Width:', window.innerWidth);
        if (window.innerWidth > 640 && nav.classList.contains('show')) {
            console.log('Removing show class for larger screens');
            nav.classList.remove('show');
            menuButton.setAttribute('aria-expanded', 'false');
        }
    });
});