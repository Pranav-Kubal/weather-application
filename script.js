async function getWeather() {
  const input = document.getElementById("locationInput").value.trim();
  const apiKey = "513ac8debfc21bad0d5e19eb15a4c8c3";

  if (!input) {
    showError("Please enter a city name or pincode.");
    return;
  }

  // Check if input is a 6-digit pincode
  const isPincode = /^\d{6}$/.test(input);

  const url = isPincode
    ? `https://api.openweathermap.org/data/2.5/weather?zip=${input},in&appid=${apiKey}&units=metric`
    : `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch weather data.");
    }

    document.getElementById(
      "cityName"
    ).textContent = `📍 ${data.name}, ${data.sys.country}`;

    document.getElementById(
      "temperature"
    ).textContent = `🌡 Temperature: ${data.main.temp}°C`;

    document.getElementById(
      "humidity"
    ).textContent = `💧 Humidity: ${data.main.humidity}%`;

    document.getElementById(
      "pressure"
    ).textContent = `🔽 Pressure: ${data.main.pressure} hPa`;

    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById("weatherIcon").src = iconUrl;
    document.getElementById("weatherIcon").style.display = "block";

    document.getElementById("weatherInfo").style.display = "block";
    document.getElementById("error").style.display = "none";
  } catch (error) {
    showError(error.message);
  }
}

function showError(message) {
  const errorAlert = document.getElementById("error");
  errorAlert.textContent = `⚠ ${message}`;
  errorAlert.style.display = "block";
  document.getElementById("weatherInfo").style.display = "none";
}
