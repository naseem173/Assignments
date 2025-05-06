// Search for a city
async function searchCity() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    displayError("Please enter a city name.");
    return;
  }
  await fetchWeather(city);
}

// Fetch weather for a city
async function fetchWeather(city) {
  try {
    clearError();
    const apiKey = "b2b562ce8ad9d8911f29e564b63ce505";

    // Fetch current weather
    const currentRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!currentRes.ok) throw new Error("City not found.");
    const currentData = await currentRes.json();

    // Fetch 5-day forecast
    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    );
    const forecastData = await forecastRes.json();

    updateWeatherDisplay(currentData);
    updateForecastDisplay(forecastData.list);
    updateRecentCities(city);
  } catch (error) {
    displayError(error.message);
  }
}

// Update the weather display
function updateWeatherDisplay(currentData) {
  const weatherDisplay = document.getElementById("weatherDisplay");
  const iconUrl = `https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`;

  weatherDisplay.innerHTML = `
    <h2 class="text-xl font-bold mb-2">${currentData.name}, ${currentData.sys.country}</h2>
    <div class="flex items-center gap-4">
      <img src="${iconUrl}" alt="${currentData.weather[0].main}" class="w-16 h-16" />
      <div>
        <p>Temperature: ${currentData.main.temp}°C</p>
        <p>Humidity: ${currentData.main.humidity}%</p>
        <p>Wind: ${currentData.wind.speed} m/s</p>
        <p>Condition: ${currentData.weather[0].main}</p>
      </div>
    </div>
  `;
}

// Update the 5-day forecast display
function updateForecastDisplay(forecastList) {
  const forecastDisplay = document.getElementById("forecastDisplay");
  forecastDisplay.innerHTML = "";

  const dailyForecast = {};

  forecastList.forEach((entry) => {
    const date = entry.dt_txt.split(" ")[0];
    if (!dailyForecast[date] && entry.dt_txt.includes("12:00:00")) {
      dailyForecast[date] = entry;
    }
  });

  Object.values(dailyForecast).forEach((entry) => {
    const iconUrl = `https://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png`;

    forecastDisplay.innerHTML += `
      <div class="bg-white shadow rounded p-4 text-center">
        <h3 class="font-semibold mb-2">${new Date(
          entry.dt_txt
        ).toLocaleDateString()}</h3>
        <img src="${iconUrl}" alt="${
      entry.weather[0].main
    }" class="mx-auto w-16 h-16" />
        <p>${entry.main.temp}°C</p>
        <p>${entry.weather[0].main}</p>
      </div>
    `;
  });
}


// Update recent cities in localStorage
function updateRecentCities(city) {
  let cities = JSON.parse(localStorage.getItem("recentCities")) || [];
  if (!cities.includes(city)) {
    cities.unshift(city);
    if (cities.length > 5) cities.pop();
    localStorage.setItem("recentCities", JSON.stringify(cities));
  }
  renderDropdown();
}

// Render recent cities dropdown
function renderDropdown() {
  const cities = JSON.parse(localStorage.getItem("recentCities")) || [];
  const dropdown = document.getElementById("recentCities");
  const container = document.getElementById("dropdownContainer");

  dropdown.innerHTML = "";
  if (cities.length > 0) {
    container.classList.remove("hidden");
    cities.forEach((city) => {
      const option = document.createElement("option");
      option.value = city;
      option.textContent = city;
      dropdown.appendChild(option);
    });
  } else {
    container.classList.add("hidden");
  }
}

// Select a recent city from the dropdown
function selectRecentCity(select) {
  const city = select.value;
  if (city) fetchWeather(city);
}

// Display error message
function displayError(message) {
  const errorDisplay = document.getElementById("errorDisplay");
  errorDisplay.textContent = message;
}

// Clear error message
function clearError() {
  const errorDisplay = document.getElementById("errorDisplay");
  errorDisplay.textContent = "";
}

// Get weather based on the user's current location
function getCurrentLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const apiKey = "b2b562ce8ad9d8911f29e564b63ce505";

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();
      updateWeatherDisplay(data);
    });
  } else {
    displayError("Geolocation is not supported by this browser.");
  }
}
