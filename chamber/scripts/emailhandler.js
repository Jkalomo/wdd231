// emailhandler.js - Handle email link functionality
document.addEventListener('DOMContentLoaded', () => {
    const emailLinks = document.querySelectorAll('#email-link');
    emailLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'mailto:contact@bulawayocc.org';
        });
        link.addEventListener('touchend', (e) => {
            if (e.cancelable) {
                e.preventDefault();
                window.location.href = 'mailto:contact@bulawayocc.org';
            }
        }, { passive: false });
    });
});