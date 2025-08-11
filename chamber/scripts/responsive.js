document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu');
    const navigation = document.getElementById('nav');

    console.log('responsive.js loaded. menuButton:', menuButton, 'navigation:', navigation);

    if (navigation) {
        navigation.classList.add('enabled');
    }

    if (menuButton && navigation) {
        menuButton.addEventListener('click', () => {
            const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
            console.log('Menu clicked. isExpanded:', isExpanded);
            menuButton.setAttribute('aria-expanded', !isExpanded);
            navigation.classList.toggle('show');
            menuButton.setAttribute('aria-label', isExpanded ? 'Open navigation menu' : 'Close navigation menu');
        });

        const navLinks = navigation.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 768) {
                    console.log('Nav link clicked, closing menu');
                    navigation.classList.remove('show');
                    menuButton.setAttribute('aria-expanded', 'false');
                    menuButton.setAttribute('aria-label', 'Open navigation menu');
                }
            });
        });
    } else {
        console.error('Menu or navigation element not found');
    }
});