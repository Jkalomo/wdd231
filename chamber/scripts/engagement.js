// engagement.js - Handles progressive engagement
document.addEventListener('DOMContentLoaded', () => {
    // Track scroll depth for CTA activation
    let scrolled = false;

    window.addEventListener('scroll', () => {
        if (!scrolled && window.scrollY > 300) {
            scrolled = true;
            enhanceCTAs();
        }
    });

    // Fallback: Enhance CTAs after 15 seconds
    setTimeout(() => {
        if (!scrolled) enhanceCTAs();
    }, 15000);

    function enhanceCTAs() {
        document.querySelectorAll('.btn.cta').forEach(btn => {
            btn.classList.add('pulse');
            // Can add analytics tracking here
        });
    }
});