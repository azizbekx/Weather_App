/* Global Variables */

let mainURL = "api.openweathermap.org/data/2.5/weather";
let keyAPI = "&appid=95b3c895ad7285dc476b6121aa5332f2&units=imperial";
const zipCode = document.getElementById("generate");
const postURL = "http://localhost:8000/addWeatherData";
const getURL = "http://localhost:8000/all";

// weather display variables
const date = document.getElementById("header");
const cityName = document.getElementById("city-name");
const citySup = document.getElementById("city-sup");
const dayNight = document.getElementById("day-night");
const weatherIcon = document.getElementById("w-icon");
const description = document.getElementById("description");
const temp = document.getElementById("temp");
const user_response = document.getElementById("user-fact");
const bgVideo = document.getElementById("bg__video");

// Event listener to add function to existing HTML DOM element


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();


// event listener performAction function in last line code eventlistener
const performAction = async(url = '', data = {})=> {
  const zipCode = document.getElementById("zip").value;
  const feelings = document.getElementById("text").value;
  document.getElementById('getButton').setAttribute('disabled', true)
  getWeather(mainURL, zipCode, keyAPI)

    .then(
      function (weatherData) {
      postData(postURL, {
        date: newDate,
        cityName: weatherData.name,
        citySup: weatherData.sys.country,
        dayNight: weatherData.weather[0].icon.charAt(2),
        weatherIcon: weatherData.weather[0].icon,
        description: weatherData.weather[0].description,
        temperature: weatherData.main.temp,
        user_response: feelings,
        bgVideo: weatherData.weather[0].main,
      });
    })

    .then(function(newData){
      updateUI();
    })
      
}
/* Function to GET Web API Data*/

const getWeather = async (mainURL, zipCode, keyAPI) => {
  const fullURL = `http://${mainURL}?zip=${zipCode}${keyAPI}`;

  const response = await fetch(fullURL);
  let jsonResponse = await response.json();
 
  return jsonResponse;
};

/* Function to POST data */
const postData = async (url = "", data = {}) => {
  console.log("data ", data);
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response;
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to GET Project Data */
const updateUI = async () => {
  const request = await fetch(getURL);
  try {
    const jsonWeather = await request.json();
    var calculateTemp = Math.floor(jsonWeather.temperature);

    date.innerHTML = jsonWeather.date;
    cityName.innerHTML = `${jsonWeather.cityName}<sup id ="sup-city">${jsonWeather.citySup}</sup>`;
    dayNight.innerHTML = `<img src = '/website/icons/${jsonWeather.dayNight}.svg' alt='sun or moon image '>`;
    weatherIcon.innerHTML = `<img src= '/website/icons/${jsonWeather.weatherIcon}.png' alt='weather icon'>`;
    description.innerHTML = `<p>${jsonWeather.description}</p>`;
    temp.innerHTML = `<p>${calculateTemp}<sup class="sup-temp">℃</sup></p>`;
    user_response.innerHTML = jsonWeather.user_response;
    bgVideo.innerHTML = `<source src="/website/videos/${jsonWeather.bgVideo}.mp4" type="video/mp4"> `;

    document.getElementById('getButton').removeAttribute('disabled')

  } catch (error) {
    console.log("error", error);
  }
};
/* Function called by event listener */
document.getElementById("getButton").addEventListener("click", performAction);