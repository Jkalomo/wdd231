// Mobile Navigation Toggle
const menuButton = document.getElementById('menu-button');
const navigation = document.querySelector('nav ul');

menuButton.addEventListener('click', () => {
    navigation.classList.toggle('show');
    menuButton.setAttribute('aria-expanded', navigation.classList.contains('show'));
});

// Close menu when clicking on a link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
            navigation.classList.remove('show');
            menuButton.setAttribute('aria-expanded', false);
        }
    });
});

// Update active link on scroll
window.addEventListener('scroll', () => {
    document.querySelectorAll('section').forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            const id = section.getAttribute('id');
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(id)) {
                    link.classList.add('active');
                }
            });
        }
    });
});