// weather.js - Fetch and display weather data for Bulawayo
document.addEventListener('DOMContentLoaded', () => {
    const weatherApiKey = '3b3ded1bab93440313d905b941f11bd4';
    const city = 'Bulawayo';
    const countryCode = 'ZW';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&units=metric&appid=${weatherApiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&units=metric&appid=${weatherApiKey}`;

    const currentWeather = document.querySelector('.current-weather');
    if (currentWeather) {
        currentWeather.innerHTML = `
            <div class="loading-message">
                <div class="loading-spinner"></div>
                <p>Loading weather...</p>
            </div>`;
    }

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            if (currentWeather) {
                currentWeather.classList.remove('loading-message');
                currentWeather.innerHTML = `
                    <p><strong>Current Temperature:</strong> <span id="current-temp">${Math.round(data.main.temp)}°C</span></p>
                    <p><strong>Condition:</strong> <span id="weather-desc">${data.weather[0].description}</span></p>
                    <p><strong>Humidity:</strong> <span id="humidity">${data.main.humidity}%</span></p>
                    <div id="weather-icon">
                        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
                    </div>
                `;
            }
        })
        .catch(error => {
            console.error('Error fetching weather:', error);
            if (currentWeather) {
                currentWeather.classList.remove('loading-message');
                currentWeather.innerHTML = '<p class="error-message">Unable to load weather data.</p>';
            }
        });

    const forecastContainer = document.getElementById('forecast-container');
    if (forecastContainer) {
        forecastContainer.innerHTML = `
            <div class="loading-message">
                <div class="loading-spinner"></div>
                <p>Loading forecast...</p>
            </div>`;
    }

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            if (forecastContainer) {
                forecastContainer.innerHTML = '';
                const dailyForecasts = data.list
                    .filter(item => item.dt_txt.includes('12:00:00'))
                    .slice(0, 3);

                if (dailyForecasts.length === 0) {
                    forecastContainer.innerHTML = '<p class="error-message">No forecast data available.</p>';
                    return;
                }

                dailyForecasts.forEach(forecast => {
                    const date = new Date(forecast.dt * 1000);
                    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                    const forecastElement = document.createElement('article');
                    forecastElement.className = 'forecast-day';
                    forecastElement.setAttribute('aria-label', `Weather forecast for ${dayName}`);
                    forecastElement.innerHTML = `
                        <p><strong>${dayName}</strong></p>
                        <p>${Math.round(forecast.main.temp)}°C</p>
                        <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="${forecast.weather[0].description}">
                    `;
                    forecastContainer.appendChild(forecastElement);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching forecast:', error);
            if (forecastContainer) {
                forecastContainer.innerHTML = '<p class="error-message">No forecast data available.</p>';
            }
        });
});