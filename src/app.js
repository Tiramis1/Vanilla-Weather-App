function displayTemperature(response){
    console.log(response.data);

    let cityElement= document.querySelector("#city");
    cityElement.innerHTML=response.data.name;


    console.log(response.data.main.temp);
    let temperatureElement= document.querySelector("#temperature");
    temperatureElement.innerHTML=Math.round(response.data.main.temp);

    let descriptionElement=document.querySelector("#description");
    descriptionElement.innerHTML=response.data.weather[0].description;

    let humidityElement=document.querySelector("#humidity");
    humidityElement.innerHTML=response.data.main.humidity;

    let windElement=document.querySelector("#wind");
    windElement.innerHTML=Math.round(response.data.wind.speed);
}

let apiKey= "0951c90b2bac386d03348c6017a913c9";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=Zurich&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);