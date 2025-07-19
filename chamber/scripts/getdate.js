// getdate.js - Update footer with current year and last modified date
document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.getElementById('year');
    const lastModifiedElement = document.getElementById('lastModified');

    if (yearElement) {
        yearElement.textContent = `© ${new Date().getFullYear()} Bulawayo Chamber of Commerce`;
    }

    if (lastModifiedElement) {
        const lastModified = new Date(document.lastModified).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        lastModifiedElement.textContent = `Last Modified: ${lastModified}`;
    }
});