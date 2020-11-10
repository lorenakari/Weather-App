function displayCityAndWeather(response) {
  let city = response.data.name

  let h1 = document.querySelector("h1");
  h1.innerHTML = city;

  let weatherDescription = response.data.weather[0].main;
  let weatherDescriptionElement = document.querySelector("#description");
  weatherDescriptionElement.innerHTML = weatherDescription;  

  let skyIcon = response.data.weather[0].icon;
  let skyIconElement = document.querySelector("#sky-icon");
  skyIconElement.setAttribute("src", `https://openweathermap.org/img/wn/${skyIcon}@2x.png`);
  skyIconElement.setAttribute("alt", weatherDescription);

  celsiusTemperature = Math.round(response.data.main.temp);

  let temperature = response.data.main.temp;
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = `${Math.round(temperature)}°C`

  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = Math.round(humidity);

  let windSpeed = response.data.wind.speed;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(windSpeed);
}

function returnWeekDay(date) {
  let weekDayNumber = date.getDay();
  let weekDay = daysOfTheWeek[weekDayNumber];

  return weekDay;
}

function  displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 36; index ++) {
  index = index + 7;
  forecast = response.data.list[index];
  forecastElement.innerHTML += `
    <div class="col btn forecast">
      <a href="">
        <h6> ${returnWeekDay(new Date(forecast.dt_txt))} </h6>
        <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" 
          class="forecast-icon"alt=""
        ></img>
        <p id="">
          <small>${Math.round(forecast.main.temp_min)}°C/
            ${Math.round(forecast.main.temp_max)}°C 
          <i class="fas fa-thermometer-half"></i>
          </small>
        </p>
      </a>
    </div>
  `;
  }
}

function search(city) {
  let apiKey = "a9764671face45f313421331b3c30f46";
  let unit = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather"
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${unit}`

  axios.get(apiUrl).then(displayCityAndWeather);

  apiEndpoint = "https://api.openweathermap.org/data/2.5/forecast"
  apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  search(city);
}

function handleCurrentLocation(position) {
let latitude = position.coords.latitude;
let longitude = position.coords.longitude;
  
let apiKey = "a9764671face45f313421331b3c30f46"
let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather"
let unit = "metric"
let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;

axios.get(apiUrl).then(displayCityAndWeather);
}

function getCurrentLocation() {
navigator.geolocation.getCurrentPosition(handleCurrentLocation);  
}

function displayCurrentWeekDay (date) {
  let weekDayNumber = date.getDay();
  let weekDay = daysOfTheWeek[weekDayNumber];
  
  let currentWeekDaySpan = document.querySelector("#current-week-day");
  currentWeekDaySpan.innerHTML = weekDay;
}

function displayCurrentDate (currentDayAndTime) {
  let currentMonthNumber = currentDayAndTime.getMonth();
  let months = [ "Jan.", "Feb.",	"Mar.",	"Apr.",	"May", "June", "July", "Aug.", "Sept.",	"Oct.",	"Nov.",	"Dec."]
  let currentMonth = months[currentMonthNumber];

  let currentDayOfTheMonth = currentDayAndTime.getDate();

  let currentYear = currentDayAndTime.getFullYear();
  
  let currentDate = `${currentMonth} ${currentDayOfTheMonth}, ${currentYear}`;
  let currentDateSpan = document.querySelector("#current-date");
  currentDateSpan.innerHTML = currentDate;
}

function displayCurrentTime (currentDayAndTime) {
  let currentHour = currentDayAndTime.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  let currentMinute = currentDayAndTime.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  let currentTime = `${currentHour}:${currentMinute}`
  
  let currentTimeA = document.querySelector("#current-time")
  currentTimeA.innerHTML = currentTime;
}

function convertToCelsius(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");

  temperatureElement.innerHTML = `${celsiusTemperature}°C`;
}

function convertToFarenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) /5 + 32);
  let temperatureElement = document.querySelector("#temperature");

  temperatureElement.innerHTML = `${fahrenheitTemperature}°F`
}

let celsiusTemperature = null;

let daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let currentDayAndTime = new Date();
displayCurrentWeekDay(currentDayAndTime);
displayCurrentDate(currentDayAndTime);
displayCurrentTime(currentDayAndTime);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFarenheit)
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);

search("São Paulo");

let searchCityForm = document.querySelector(".search-city");
searchCityForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector(".current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);