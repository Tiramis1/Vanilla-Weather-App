function displayTemperature(response){
    console.log(response.data);
}

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
    return `${day} ${hours}:${minutes};

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
    iconElement.setAttribute("src", http://openweathermap.org/img/wn/${repsonse.data.weather[0].icon}@2x.png);
    iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city){
    let apiKey= "0951c90b2bac386d03348c6017a913c9";
    let apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=Zurich&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event){
    event.preventDefault();
    let cityName=document.querySelector("#search-input");
    search(cityName.value);
    console.log(cityName.value);

search("Paris");

let form=document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);