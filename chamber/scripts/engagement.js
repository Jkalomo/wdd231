// engagement.js - Handles progressive engagement
document.addEventListener('DOMContentLoaded', () => {
    enhanceCTAs();

    let scrolled = false;
    window.addEventListener('scroll', () => {
        if (!scrolled && window.scrollY > 200) {
            scrolled = true;
            enhanceCTAs();
        }
    });

    setTimeout(enhanceCTAs, 10000);

    function enhanceCTAs() {
        document.querySelectorAll('.btn.cta').forEach(btn => {
            btn.classList.add('pulse');
        });
    }
});