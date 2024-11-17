searchButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    const API_KEY = "481beba329bdb1fe4ff3c40fbd68548c";
    
    if (!city) {
        weatherData.innerHTML = "<p>Please enter a city name.</p>";
        return;
    }
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                weatherData.innerHTML = `<p>${data.message}</p>`;
                return;
            }

            const tempCelsius = (data.main.temp - 273.15).toFixed(1);
            const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

            weatherData.innerHTML = `
                <div class="weather-card">
                    <h2>${data.name}, ${data.sys.country}</h2>
                    <div class="weather-icon-container">
                        <img class="weather-icon" src="${iconUrl}" alt="${data.weather[0].description}" />
                    </div>
                    <p>${data.weather[0].description}</p>
                    <p><strong>Temperature:</strong> ${tempCelsius}°C</p>
                    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
                </div>
            `;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherData.innerHTML = '<p>An error occurred. Please try again.</p>';
        });
});
