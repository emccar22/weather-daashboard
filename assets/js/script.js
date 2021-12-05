var currentCity = "";
var cityFormEl = document.getElementById("city-search");
var searchInputEl = document.getElementById("city");
var searchHistoryEl = document.getElementById("search-button-container");
var currentWeatherConatinerEl = document.getElementById("current-weather-container");
var currentCityEl = document.getElementById("current-city");
var currentIcon = document.getElementById("current-icon");
var currentDataListEl = document.getElementById("current-data-list");

var coordinates = {
    lat: "",
    lon: ""
}

var getWeather = function() {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + coordinates.lat + "&lon=" + coordinates.lon + "&units=imperial&exclude=minutely,hourly,alerts&appid=9fb82a034e3a45b2f32f67ba18e0925b"

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data)
                currentWeatherConatinerEl.className = "border"
                currentCityEl.textContent = currentCity + " (" +moment().format('L') + ")";
                
                var iconCode = data.current.weather[0].icon;
                
                var iconUrl = "https://openweathermap.org/img/wn/" + iconCode + ".png";
                currentIcon.setAttribute("src", iconUrl);
                
                var currentTempEl = document.createElement("li");
                currentTempEl.textContent = "Temp: " + data.current.temp + " \xB0F";
                currentDataListEl.appendChild(currentTempEl);
                
                var currentWindEl = document.createElement("li");
                currentWindEl.textContent = "Wind: " + data.current.wind_speed + " MPH";
                currentDataListEl.appendChild(currentWindEl);
                
                var currentHumidityEl = document.createElement("li");
                currentHumidityEl.textContent = "Humidity: " + data.current.humidity + " %";
                currentDataListEl.appendChild(currentHumidityEl);
                
                var currentUvIndexEl = document.createElement("li");
                currentUvIndexEl.textContent = "UV Index: " + data.current.uvi;
                currentDataListEl.appendChild(currentUvIndexEl);
            })
        }
    })
    
}

var getLocation = function(city) {
    var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=9fb82a034e3a45b2f32f67ba18e0925b"

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data)
                coordinates.lat = data[0].lat
                coordinates.lon = data[0].lon
                console.log(coordinates);
                getWeather();
            })
        }
    })
    
}

var formSubmitHandler = function(event) {
    event.preventDefault();

    var city = searchInputEl.value.trim();
    currentCity = city;

    if (city) {
        getLocation(city);
        searchInputEl.value = "";
        var historyButtonEl = document.createElement("button");
        historyButtonEl.className = "btn btn-secondary col-12 mt-1 mb-1";
        historyButtonEl.setAttribute("value", city);
        historyButtonEl.textContent = city;
        searchHistoryEl.appendChild(historyButtonEl);
    } else {
        alert("Please Enter a City")
    }
}

cityFormEl.addEventListener("submit", formSubmitHandler);


