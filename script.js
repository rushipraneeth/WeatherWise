const weatherform = document.querySelector(".weather_form");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apikey = "e4bc1bd2a168cbc9a5ad06a2d0f943f3";

weatherform.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityInput.value;
    if (city) {
        try {
            const weatherData = await getweatherData(city);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error(error);
            displayError(error);
        }
    } else {
        displayError("Please enter a city.");
    }
});

async function getweatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
    
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error("Could not fetch weather data");
    } else {
        return await response.json();
    }
}

function displayWeatherInfo(data) {
    const { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data;
    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${temp}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getEmoji(id);

    card.appendChild(cityDisplay);
    cityDisplay.classList.add("cityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");

    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(weatherEmoji);
}

function getEmoji(weatherId) {
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return '⛈️'; // Thunderstorm
        case (weatherId >= 300 && weatherId < 400):
            return '🌧️'; // Drizzle
        case (weatherId >= 500 && weatherId < 600):
            return '🌧️'; // Rain
        case (weatherId >= 600 && weatherId < 700):
            return '❄️'; // Snow
        case (weatherId >= 700 && weatherId < 800):
            return '🌫️'; // Atmosphere (mist, smoke, etc.)
        case (weatherId === 800):
            return '☀️'; // Clear sky
        case (weatherId >= 801 && weatherId < 810):
            return '☁️'; // Few clouds
        default:
            return '❓'; // Unknown weather
    }
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("ErrorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}
