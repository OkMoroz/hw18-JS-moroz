"use strict";

const weatherBlock = document.querySelector("#weather");

function loadWeather() {
  weatherBlock.innerHTML = `
    <div class="loading">
    <img src="image/loading-icon.gif" alt="loading.gif"  width="250" height="250">
    </div>`;

  fetch(
    "http://api.openweathermap.org/data/2.5/weather?q=Lviv&units=metric&APPID=d7f1c188f618a6d306fef4f39faffce5"
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Response was not ok.");
      }
    })
    .then((weatherData) => {
      getWeather(weatherData);
    })
    .catch((error) => {
      weatherBlock.innerHTML = "<p>ERROR. Try again.</p>";
    });
}

function getWeather(weatherData) {
  const location = weatherData.name;
  const temp = Math.round(weatherData.main.temp);
  const pressure = Math.round(weatherData.main.pressure);
  const description = weatherData.weather[0].description;
  const humidity = Math.round(weatherData.main.humidity);
  const speed = Math.round(weatherData.wind.speed);
  const deg = Math.round(weatherData.wind.deg);
  const icon = weatherData.weather[0].icon;

  const currentDateTime = new Date();
  const date = currentDateTime.toLocaleDateString();
  const time = currentDateTime.toLocaleTimeString();

  const template = `<div class="weather-header">
    <div class="weather-main">
        <div class="weather-city">${location}</div>
        <div class="weather-temp">${temp}°C</div>
        <div class="weather-icon">
            <img src="http://openweathermap.org/img/w/${icon}.png" alt="Icon">
        </div>
        <div class="weather-description">description: ${description}</div>
        <div class="weather-pressure">pressure: ${pressure} мм</div>
        <div class="weather-humidity">humidity: ${humidity} %</div>
        <div class="weather-speed">wind speed: ${speed} м/с</div>
         <div class="weather-deg">wind direction: ${deg}°</div>
    </div>
</div>
 <div class="weather-datetime">
        <div class="weather-date">Date: ${date}</div>
        <div class="weather-time">Time: ${time}</div>
    </div>`;

  weatherBlock.innerHTML = template;
}

if (weatherBlock) {
  loadWeather();
}
