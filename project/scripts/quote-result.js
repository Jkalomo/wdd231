document.addEventListener('DOMContentLoaded', () => {
    const quoteResult = document.getElementById('quote-result');
    const params = new URLSearchParams(window.location.search);
    const quoteData = {
        age: params.get('age'),
        coverType: params.get('coverType'),
        coverageAmount: params.get('coverageAmount'),
        timestamp: params.get('timestamp')
    };

    if (quoteData.age && quoteData.coverType && quoteData.coverageAmount) {
        const baseRate = quoteData.coverType === 'funeral' ? 0.01 : quoteData.coverType === 'life' ? 0.02 : 0.015;
        const premium = (parseInt(quoteData.coverageAmount) * baseRate * (parseInt(quoteData.age) / 30)).toFixed(2);

        quoteResult.innerHTML = `
            <div class="card">
                <h3>Premium Estimate</h3>
                <p><strong>Cover Type:</strong> ${quoteData.coverType.charAt(0).toUpperCase() + quoteData.coverType.slice(1)}</p>
                <p><strong>Age:</strong> ${quoteData.age}</p>
                <p><strong>Coverage Amount:</strong> $${quoteData.coverageAmount}</p>
                <p><strong>Estimated Monthly Premium:</strong> $${premium}</p>
                <p><strong>Calculated On:</strong> ${new Date(quoteData.timestamp).toLocaleString()}</p>
            </div>
        `;
    } else {
        quoteResult.innerHTML = '<div class="card"><p>No quote data available. Please calculate a quote first.</p></div>';
    }

    // Hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        hamburger.setAttribute('aria-expanded', navMenu.classList.contains('active'));
    });
});