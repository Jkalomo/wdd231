document.addEventListener('DOMContentLoaded', () => {
    const weatherApiKey = '3b3ded1bab93440313d905b941f11bd4'; // Weater actual API key
    const city = 'Bulawayo';
    const countryCode = 'ZW';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&units=metric&appid=${weatherApiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&units=metric&appid=${weatherApiKey}`;

    // Fetch current weather
    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('current-temp').textContent = `${Math.round(data.main.temp)}°C`;
            document.getElementById('weather-desc').textContent = data.weather[0].description;
            document.getElementById('humidity').textContent = data.main.humidity;

            // Set weather icon
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            document.getElementById('weather-icon').innerHTML = `<img src="${iconUrl}" alt="${data.weather[0].description}">`;
        })
        .catch(error => console.error('Error fetching weather:', error));

    // Fetch forecast
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            const forecastContainer = document.getElementById('forecast-container');
            forecastContainer.innerHTML = '';

            // Filter for daily forecasts (every 24 hours)
            const dailyForecasts = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);

            dailyForecasts.forEach(forecast => {
                const date = new Date(forecast.dt * 1000);
                const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

                const forecastElement = document.createElement('div');
                forecastElement.className = 'forecast-day';
                forecastElement.innerHTML = `
                    <p><strong>${dayName}</strong></p>
                    <p>${Math.round(forecast.main.temp)}°C</p>
                    <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="${forecast.weather[0].description}">
                `;

                forecastContainer.appendChild(forecastElement);
            });
        })
        .catch(error => console.error('Error fetching forecast:', error));
});