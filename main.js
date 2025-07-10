const api = {
  key: "fcc8de7015bbb202209bbf0261babf4c",
  base: "https://api.openweathermap.org/data/2.5/",
};

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.key === "Enter" || evt.keyCode === 13) {
    getResults(searchbox.value.trim());
  }
}

function getResults(query) {
  if (!query) {
    showError("Please enter a city name.");
    return;
  }

  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.cod === "404") {
        showError("City not found. Please try another one.");
      } else {
        displayResults(data);
        clearError();
      }
    })
    .catch(() => showError("Network error. Please try again later."));
}

function displayResults(weather) {
  document.querySelector(
    ".city"
  ).innerText = `${weather.name}, ${weather.sys.country}`;

  const now = new Date();
  document.querySelector(".date").innerText = dateBuilder(now);

  document.querySelector(".temp").innerHTML = `${Math.round(
    weather.main.temp
  )}<span>°C</span>`;
  document.querySelector(".weather").innerText = weather.weather[0].main;
  document.querySelector(".hi-low").innerText = `${Math.round(
    weather.main.temp_min
  )}°C / ${Math.round(weather.main.temp_max)}°C`;

  const iconCode = weather.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  const iconImg = document.querySelector(".weather-icon");
  iconImg.src = iconUrl;
  iconImg.style.display = "block";
}

function showError(message) {
  const errorBox = document.querySelector(".error-message");
  errorBox.innerText = message;
}

function clearError() {
  const errorBox = document.querySelector(".error-message");
  errorBox.innerText = "";
}

function dateBuilder(d) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const day = days[d.getDay()];
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
