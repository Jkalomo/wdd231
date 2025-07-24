// scripts/join.js - Set timestamp on form load
document.addEventListener('DOMContentLoaded', () => {
    const timestampInput = document.getElementById('timestamp');
    if (timestampInput) {
        const now = new Date().toISOString();
        timestampInput.value = now;
    }
});