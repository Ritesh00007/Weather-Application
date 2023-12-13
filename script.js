const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weatherImg = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');

const locationNotFound = document.querySelector('.location-not-found');
const weatherBody = document.querySelector('.weather-body');

async function checkWeather(city) {
    const apiKey = "8d15b3d451196a0dd46b5fbe27b0e0c6"; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}`;

    try {
        const response = await fetch(url);
        const weatherData = await response.json();

        if (weatherData.cod === "404") {
            locationNotFound.style.display = "flex";
            weatherBody.style.display = "none";
            return;
        }

        locationNotFound.style.display = "none";
        weatherBody.style.display = "flex";

        temperature.innerHTML = `${Math.round(weatherData.main.temp)}<sup>°C</sup>`;
        description.innerHTML = weatherData.weather[0].description;
        humidity.innerHTML = `${weatherData.main.humidity}%`;
        windSpeed.innerHTML = `${weatherData.wind.speed} Km/H`;

        // Add more cases as needed for different weather conditions
        switch (weatherData.weather[0].main) {
            case 'Clouds':
                weatherImg.src = "/assets/cloud.png";
                break;
            case 'Clear':
                weatherImg.src = "/assets/clear.png";
                break;
            // ... other cases
        }
    } catch (error) {
        console.error("Fetching weather data failed:", error);
    }
}

searchBtn.addEventListener('click', () => {
    if (inputBox.value) {
        checkWeather(inputBox.value.trim());
    }
});

// Add an event listener for the Enter key
inputBox.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && inputBox.value) {
        checkWeather(inputBox.value.trim());
    }
});
