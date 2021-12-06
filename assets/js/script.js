var currentCity = "";
var cityFormEl = document.getElementById("city-search");
var searchInputEl = document.getElementById("city");
var searchHistoryEl = document.getElementById("search-button-container");
var currentWeatherConatinerEl = document.getElementById("current-weather-container");
var currentCityEl = document.getElementById("current-city");
var currentIcon = document.getElementById("current-icon");
var forecastConatinerEl = document.getElementById("forecast-container")
var historyButtonEl = document.getElementById("history-button")

var coordinates = {
    lat: "",
    lon: ""
}

var getWeather = function() {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + coordinates.lat + "&lon=" + coordinates.lon + "&units=imperial&exclude=minutely,hourly,alerts&appid=9fb82a034e3a45b2f32f67ba18e0925b"

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                currentWeatherConatinerEl.className = "border col-8 mt-2"
                currentCityEl.textContent = currentCity + " (" +moment().format('L') + ")";
                
                var currentIconCode = data.current.weather[0].icon;
                
                var currentIconUrl = "https://openweathermap.org/img/wn/" + currentIconCode + ".png";
                currentIcon.setAttribute("src", currentIconUrl);
                
                var currentTempEl = document.getElementById("current-temp");
                currentTempEl.textContent = "Temp: " + data.current.temp + " \xB0F";
                
                var currentWindEl = document.getElementById("current-wind");
                currentWindEl.textContent = "Wind: " + data.current.wind_speed + " MPH";
                
                var currentHumidityEl = document.getElementById("current-humidity");
                currentHumidityEl.textContent = "Humidity: " + data.current.humidity + "%";
                
                var currentUvIndexEl = document.getElementById("current-uv");
                currentUvIndexEl.textContent = "UV Index: " + data.current.uvi;
                if (data.current.uvi <= 2) {
                    currentUvIndexEl.className = "bg-success"
                }
                else if (data.current.uvi <= 5) {
                    currentUvIndexEl.className = "bg-warning"
                }
                else {
                    currentUvIndexEl.className = "bg-danger"
                }

                var forecastDiv = document.createElement("div");               
                forecastDiv.className = "row mt-4 justify-content-between"
                forecastConatinerEl.appendChild(forecastDiv);

                var forecastTitleEl = document.createElement("h4");
                forecastTitleEl.textContent = "5-Day Forecast:";
                forecastDiv.appendChild(forecastTitleEl);

                for (var i = 0; i < data.daily.length - 3; i++) {
                    
                    
                    var dailyContainerEl = document.createElement("div");
                    dailyContainerEl.className = "card col-2 m-2 bg-dark forcast-card"
                    forecastDiv.appendChild(dailyContainerEl);
                    
                    var days = i + 1
                    var forecastDateEl = document.createElement("h5");
                    forecastDateEl.className = "card-title mt-2"
                    forecastDateEl.textContent = moment().add(days, "days").format('L');;
                    dailyContainerEl.appendChild(forecastDateEl);

                    var forecastIconCode = data.daily[i].weather[0].icon;
                    var forecastIconUrl = "https://openweathermap.org/img/wn/" + forecastIconCode + ".png";
                    
                    var forecastIconEl = document.createElement("img");
                    forecastIconEl.setAttribute("src", forecastIconUrl);
                    forecastIconEl.className = "forecast-image";
                    dailyContainerEl.appendChild(forecastIconEl);

                    var forecastTempEl = document.createElement("p");
                    forecastTempEl.textContent = "Temp: " + data.daily[i].temp.day + " \xB0F";
                    dailyContainerEl.appendChild(forecastTempEl);

                    var forecastWindEl = document.createElement("p");
                    forecastWindEl.textContent = "Wind: " + data.daily[i].wind_speed + " MPH";
                    dailyContainerEl.appendChild(forecastWindEl);

                    var forecastHumidityEl = document.createElement("p");
                    forecastHumidityEl.textContent = "Humidity: " + data.daily[i].humidity + "%";
                    dailyContainerEl.appendChild(forecastHumidityEl);

                }


                
             })
        }
    })
    
}

var getLocation = function(city) {
    var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=9fb82a034e3a45b2f32f67ba18e0925b"

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                coordinates.lat = data[0].lat
                coordinates.lon = data[0].lon
                getWeather();
                localStorage.setItem(city, JSON.stringify(coordinates));
            })
        }
    })
    
}

var loadHistory = function() {
    localStorage.getItem("city")
    console.log(city);
    historyButtonEl.addEventListener("submit",);
    getWeather();
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
        historyButtonEl.setAttribute("id", "history-button");
        historyButtonEl.setAttribute("type", "submit");
        historyButtonEl.textContent = city;
        searchHistoryEl.appendChild(historyButtonEl);
        
        forecastConatinerEl.innerHTML = "";
    } else {
        alert("Please Enter a City")
    }
}

cityFormEl.addEventListener("submit", formSubmitHandler);

loadHistory();





