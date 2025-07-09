function refreshWeather(response){
  let cityElement = document.querySelector(".titleCity");
  let tempElement = document.querySelector(".currentTemp");
  let temperature = response.data.temperature.current;
  let iconElement = document.querySelector("#icon")
  let timeElement = document.querySelector(".time")
  let descriptionElement = document.querySelector("#description");
  let windElement = document.querySelector("#wind");
  let humidutyElement = document.querySelector("#humidity");
  let date = new Date(response.data.time * 1000);

  

  cityElement.innerHTML = response.data.city;
  tempElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon">`;
  timeElement.innerHTML = formatDate(date)
  descriptionElement.innerHTML = response.data.condition.description;
  windElement.innerHTML = `${response.data.wind.speed} Km/h`;
  humidutyElement.innerHTML = `${response.data.temperature.humidity} %`;
  //console.log(response.data);
  getForecast(response.data.city);
}

function formatDate(date){
  
  let hours= date.getHours()
  let minutes = date.getMinutes()
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (hours < 10) {
    hours = `0${hours}`;
  }


  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`

}

function searchCity(city) {
  let apiKey = "fb3o96aeef26e064f124eb8cta459256";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather)
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function friendlyFormatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city){
  let apiKey = "fb3o96aeef26e064f124eb8cta459256";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast)
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast"); 
 //console.log(response.data)

  let forecastHtml = '<ul class="forecast-list">';

  response.data.daily.forEach(function (day, index) {

    if (index < 5) {

      forecastHtml += `
      <li class="forecast-day">
        <div class="forecast-date">${friendlyFormatDate(day.time)}</div>
        <img src="${day.condition.icon_url}" class="forecast-icon" />
        <div class="forecast-temperatures">
          <span class="temp-max">${Math.round(
            day.temperature.maximum
          )}°</span> /
          <span class="temp-min">${Math.round(day.temperature.minimum)}°</span>
        </div>
      </li>`;
    
    }
  });

  forecastHtml += "</ul>";
  forecastElement.innerHTML = forecastHtml;
}


let searchFormElement = document.querySelector(".searchForm");
//console.log(searchFormElement);
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Medellin") ;// call the city when the page is loaded so it will appear without search

