import { fetchCurrentCity, fetchForecastCity } from './fetch';

const { format, parse } = require('date-fns');

let currentCityObject;
let forecastCityObject;

function changeCurrentCity() {
  const cityName = document.getElementById('current-city');
  const tempText = document.getElementById('current-temp');
  const phrase = document.getElementById('current-phrase');
  const image = document.getElementById('current-icon');

  cityName.textContent = currentCityObject.location.name;

  if (document.getElementById('cf-button').textContent === 'C') {
    tempText.textContent = `${currentCityObject.current.temp_c}°C`;
  } else {
    tempText.textContent = `${currentCityObject.current.temp_f}°F`;
  }

  phrase.textContent = currentCityObject.current.condition.text;

  image.src = currentCityObject.current.condition.icon;
}

function changeForecastCities() {
  const todayCityName = document.getElementById('today-city');
  const todayTempText = document.getElementById('today-temp');
  const todayPhrase = document.getElementById('today-phrase');
  const todayImage = document.getElementById('today-icon');
  const todayDate = document.getElementById('today-date');

  const tomorrowCityName = document.getElementById('tomorrow-city');
  const tomorrowTempText = document.getElementById('tomorrow-temp');
  const tomorrowPhrase = document.getElementById('tomorrow-phrase');
  const tomorrowImage = document.getElementById('tomorrow-icon');
  const tomorrowDate = document.getElementById('tomorrow-date');

  const afterCityName = document.getElementById('after-city');
  const afterTempText = document.getElementById('after-temp');
  const afterPhrase = document.getElementById('after-phrase');
  const afterImage = document.getElementById('after-icon');
  const afterDate = document.getElementById('after-date');

  const cityName = forecastCityObject.location.name;

  todayCityName.textContent = cityName;
  tomorrowCityName.textContent = cityName;
  afterCityName.textContent = cityName;

  todayPhrase.textContent =
    forecastCityObject.forecast.forecastday[0].day.condition.text;
  tomorrowPhrase.textContent =
    forecastCityObject.forecast.forecastday[1].day.condition.text;
  afterPhrase.textContent =
    forecastCityObject.forecast.forecastday[2].day.condition.text;

  todayImage.src =
    forecastCityObject.forecast.forecastday[0].day.condition.icon;
  tomorrowImage.src =
    forecastCityObject.forecast.forecastday[1].day.condition.icon;
  afterImage.src =
    forecastCityObject.forecast.forecastday[2].day.condition.icon;

  if (document.getElementById('cf-button').textContent === 'C') {
    todayTempText.textContent = `${forecastCityObject.forecast.forecastday[0].day.avgtemp_c}°C`;
    tomorrowTempText.textContent = `${forecastCityObject.forecast.forecastday[1].day.avgtemp_c}°C`;
    afterTempText.textContent = `${forecastCityObject.forecast.forecastday[2].day.avgtemp_c}°C`;
  } else {
    todayTempText.textContent = `${forecastCityObject.forecast.forecastday[0].day.avgtemp_f}°F`;
    tomorrowTempText.textContent = `${forecastCityObject.forecast.forecastday[1].day.avgtemp_f}°F`;
    afterTempText.textContent = `${forecastCityObject.forecast.forecastday[2].day.avgtemp_f}°F`;
  }

  const parsedTodayDate = parse(
    forecastCityObject.forecast.forecastday[0].date,
    'yyyy-MM-dd',
    new Date()
  );
  const parsedTomorrowDate = parse(
    forecastCityObject.forecast.forecastday[1].date,
    'yyyy-MM-dd',
    new Date()
  );
  const parsedAfterDate = parse(
    forecastCityObject.forecast.forecastday[2].date,
    'yyyy-MM-dd',
    new Date()
  );

  todayDate.textContent = format(parsedTodayDate, 'MMM dd');
  tomorrowDate.textContent = format(parsedTomorrowDate, 'MMM dd');
  afterDate.textContent = format(parsedAfterDate, 'MMM dd');
}

function handleInvalidCity() {
  const input = document.getElementById('search-input');
  input.classList.add('error');
  input.addEventListener('click', () => {
    input.classList.remove('error');
  });
}

function convertTemperature() {
  const tempButton = document.getElementById('cf-button');
  const tempText = document.getElementById('current-temp');

  const todayTemp = document.getElementById('today-temp');
  const tomorrowTemp = document.getElementById('tomorrow-temp');
  const afterTemp = document.getElementById('after-temp');

  if (tempButton.textContent === 'C') {
    tempText.textContent = `${currentCityObject.current.temp_f}°F`;
    todayTemp.textContent = `${forecastCityObject.forecast.forecastday[0].day.avgtemp_f}°F`;
    tomorrowTemp.textContent = `${forecastCityObject.forecast.forecastday[1].day.avgtemp_f}°F`;
    afterTemp.textContent = `${forecastCityObject.forecast.forecastday[2].day.avgtemp_f}°F`;
    tempButton.textContent = 'F';
  } else {
    tempText.textContent = `${currentCityObject.current.temp_c}°C`;
    todayTemp.textContent = `${forecastCityObject.forecast.forecastday[0].day.avgtemp_c}°C`;
    tomorrowTemp.textContent = `${forecastCityObject.forecast.forecastday[1].day.avgtemp_c}°C`;
    afterTemp.textContent = `${forecastCityObject.forecast.forecastday[2].day.avgtemp_c}°C`;
    tempButton.textContent = 'C';
  }
}

function convertListener() {
  const temperatureButton = document.getElementById('cf-button');
  temperatureButton.addEventListener('click', () => {
    convertTemperature();
  });
}

export async function searchCity(cityName) {
  try {
    currentCityObject = await fetchCurrentCity(cityName);
    forecastCityObject = await fetchForecastCity(cityName);
    changeCurrentCity();
    changeForecastCities();
    console.log(currentCityObject);
    console.log(forecastCityObject);
  } catch (error) {
    handleInvalidCity();
  }
}

export async function initCity(cityName) {
  await searchCity(cityName);
  convertListener();
}

function searchListener() {
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');

  searchButton.addEventListener('click', () => {
    searchCity(searchInput.value);
  });
}

function preventSubmit() {
  document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
  });
}

export default function runDomFunctions() {
  searchListener();
  preventSubmit();
}
