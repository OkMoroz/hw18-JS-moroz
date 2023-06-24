"use strict";

const weatherBlock = document.querySelector("#weather");
const xhr = new XMLHttpRequest();

function loadWeather() {
  weatherBlock.innerHTML = `
    <div class="loading">
    <img src="image/loading-icon.gif" alt="loading.gif"  width="250" height="250">
    </div>`;

  const server =
    "http://api.openweathermap.org/data/2.5/weather?q=KYIV&units=metric&APPID=d7f1c188f618a6d306fef4f39faffce5";
  xhr.open("GET", server, true);
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      const responseResult = JSON.parse(xhr.responseText);
      getWeather(responseResult);
    } else {
      weatherBlock.innerHTML = xhr.responseText;
    }
  };

  xhr.onerror = function () {
    weatherBlock.innerHTML = "<p>ERROR. Try again.</p>";
  };

  xhr.send();
}

function getWeather(weatherData) {
  const location = weatherData.name;
  const temp = Math.round(weatherData.main.temp);
  const pressure = Math.round(weatherData.main.pressure);
  const description = weatherData.weather[0].description;
  const humidity = Math.round(weatherData.main.humidity);
  const speed = Math.round(weatherData.wind.speed);
  const deg = Math.round(weatherData.wind.deg);

  const template = `<div class="weather-header">
    <div class="weather-main">
        <div class="weather-city">${location}</div>
        <div class="weather-temp">${temp}°C</div>
        <div class="weather-icon">
            <img src="http://openweathermap.org/img/w/10d.png" alt="Icon Weather">
        </div>
        <div class="weather-description">description: ${description}</div>
        <div class="weather-pressure">pressure: ${pressure} мм</div>
        <div class="weather-humidity">humidity: ${humidity} %</div>
        <div class="weather-speed">wind speed: ${speed} м/с</div>
         <div class="weather-deg">wind direction: ${deg}°</div>
    </div>
</div>`;

  weatherBlock.innerHTML = template;
}

if (weatherBlock) {
  loadWeather();
}
