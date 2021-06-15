//
let now = new Date();
let TodayDate = document.querySelector("#date");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

TodayDate.innerHTML = `${day} ${hours}:${minutes}`;

//

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
          <div class="col-2">
            <div class="card">
              <div class="weather-forecast-date">${day}</div>
              <img
              src="http://openweathermap.org/img/wn/50d@2x.png"
              alt=""
              />
              <div class="weather-forecast-temperature">
              25°C | 21°C
              </div>
          </div>
        </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

//

function showWeather(response) {
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let h1Element = document.querySelector("h1");
  let currentElement = document.querySelector("#currentTemp");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  descriptionElement.innerHTML = `${response.data.weather[0].description}`;
  humidityElement.innerHTML = `${response.data.main.humidity}`;
  windElement.innerHTML = `${response.data.wind.speed}`;
  h1Element.innerHTML = `${response.data.name}`;
  currentElement.innerHTML = Math.round(celsiusTemperature);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function getLocation(position) {
  let apiKey = "76bf6933b6922de0cde6be9b8c4a3589";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

let currentLocationButton = document.querySelector("#Current-Location-Button");
currentLocationButton.addEventListener("click", getPosition);

function search(city) {
  let apiKey = "76bf6933b6922de0cde6be9b8c4a3589";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  search(city);
}

let celsiusTemperature = null;

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let conversionElement = document.querySelector("#currentTemp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  conversionElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let conversionElement = document.querySelector("#currentTemp");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  conversionElement.innerHTML = Math.round(celsiusTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Hong Kong");
displayForecast();
