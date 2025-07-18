document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu');
    const navigation = document.getElementById('nav');

    // Always enable navigation
    if (navigation) {
        navigation.classList.add('enabled');
    }

    if (menuButton && navigation) {
        menuButton.addEventListener('click', () => {
            const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
            menuButton.setAttribute('aria-expanded', !isExpanded);
            navigation.classList.toggle('show');
        });

        // Ensure links work normally
        const navLinks = navigation.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Only close menu for mobile
                if (window.innerWidth < 768) {
                    navigation.classList.remove('show');
                    menuButton.setAttribute('aria-expanded', 'false');
                }
                // Allow normal navigation
                return true;
            });
        });
    }
});