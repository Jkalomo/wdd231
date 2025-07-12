document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu');
    const navigation = document.querySelector('nav');

    if (menuButton && navigation) {
        menuButton.addEventListener('click', () => {
            navigation.classList.toggle('show');
            menuButton.setAttribute('aria-expanded',
                menuButton.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
        });
    }
});