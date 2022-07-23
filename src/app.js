function dateFormat(timestamp){
    let date= new Date(timestamp);
    let hours=date.getHours();
    if (hours<10){
        hours=`0${hours}`;
    }
    let minutes=date.getMinutes();
    if (minutes<10){
        minutes=`0${minutes}`;
    }
    let days=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day=days[date.getDay()];
    return `${day} ${hours}:${minutes}`
}

function getForecast(coordinates){
    console.log(coordinates);
    let apiKey= "0951c90b2bac386d03348c6017a913c9";
    let apiUrl= `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response){
    console.log(response.data.daily);

    let cityElement= document.querySelector("#city");
    cityElement.innerHTML=response.data.name;

    let temperatureElement= document.querySelector("#temperature");
    temperatureElement.innerHTML=Math.round(response.data.main.temp);

    let descriptionElement=document.querySelector("#description");
    descriptionElement.innerHTML=response.data.weather[0].description;

    let humidityElement=document.querySelector("#humidity");
    humidityElement.innerHTML=response.data.main.humidity;

    let windElement=document.querySelector("#wind");
    windElement.innerHTML=Math.round(response.data.wind.speed);

    let dateElement=document.querySelector("#date");
    dateElement.innerHTML= dateFormat(response.data.dt*1000);

    let iconElement=document.querySelector("#weather-icon");

    let celsiusTemperature=response.data.main.temp;
    
    iconElement.setAttribute(
        "src", 
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);

    getForecast(response.data.coord);
}

function displayForecast(response){
    console.log(response.data);
    let forecastElement=document.querySelector("#forecast");
    let forecastHTML= `<div class="row">`;
    let days=["Sun","Mon","Tue","Wed"];
    days.forEach(function (day) {
       forecastHTML= 
            forecastHTML +          
                `<div class="col-2">
                    <div class="forecast-weekday">${day}</div>
                    <span class="forecast-temperature-max">34</span>
                    <span class="forecast-temperature-min">28</span>
                </div>`;
    });

    forecastHTML= forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

function search(city){
    let apiKey= "0951c90b2bac386d03348c6017a913c9";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event){
    event.preventDefault();
    let cityName=document.querySelector("#search-input");
    search(cityName.value);
    console.log(cityName.value);
}

function displayFahrenheitTemperature(event){
    event.preventDefault();
    let temperatureElement=document.querySelector("#temperature");
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML= Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event){
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement=document.querySelector("#temperature");
    temperatureElement.innerHTML=Math.round(celsiusTemperature);
}


let celsiusTemperature=null;

let form=document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink= document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink= document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Zurich");
