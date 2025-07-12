// Handle email link functionality
document.addEventListener('DOMContentLoaded', function () {
    const emailLink = document.getElementById('email-link');
    if (emailLink) {
        emailLink.addEventListener('click', function (e) {
            e.preventDefault();
            window.location.href = 'mailto:contact@bulawayocc.org';
        });

        emailLink.addEventListener('touchend', function (e) {
            e.preventDefault();
            window.location.href = 'mailto:contact@bulawayocc.org';
        });
    }
});