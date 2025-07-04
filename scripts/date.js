// Get and display current year
document.getElementById('currentyear').textContent = new Date().getFullYear();

// Get and display last modified date
document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;

// Display current date in header if needed
const currentDate = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
// document.querySelector('.current-date').textContent = currentDate.toLocaleDateString('en-US', options);
  
  