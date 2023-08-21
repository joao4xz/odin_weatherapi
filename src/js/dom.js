import { fetchCurrentCity, fetchForecastCity, fetchHistoryCity } from './fetch';

const { format, parse, subDays } = require('date-fns');

let currentCityObject;
let forecastCityObject;
let historyCityArray;

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

function changeHistoryCities() {
  const firstCityName = document.getElementById('first-city');
  const firstTempText = document.getElementById('first-temp');
  const firstPhrase = document.getElementById('first-phrase');
  const firstImage = document.getElementById('first-icon');
  const firstDate = document.getElementById('first-date');

  const secondCityName = document.getElementById('second-city');
  const secondTempText = document.getElementById('second-temp');
  const secondPhrase = document.getElementById('second-phrase');
  const secondImage = document.getElementById('second-icon');
  const secondDate = document.getElementById('second-date');

  const thirdCityName = document.getElementById('third-city');
  const thirdTempText = document.getElementById('third-temp');
  const thirdPhrase = document.getElementById('third-phrase');
  const thirdImage = document.getElementById('third-icon');
  const thirdDate = document.getElementById('third-date');

  const fourthCityName = document.getElementById('fourth-city');
  const fourthTempText = document.getElementById('fourth-temp');
  const fourthPhrase = document.getElementById('fourth-phrase');
  const fourthImage = document.getElementById('fourth-icon');
  const fourthDate = document.getElementById('fourth-date');

  const fifthCityName = document.getElementById('fifth-city');
  const fifthTempText = document.getElementById('fifth-temp');
  const fifthPhrase = document.getElementById('fifth-phrase');
  const fifthImage = document.getElementById('fifth-icon');
  const fifthDate = document.getElementById('fifth-date');

  const cityName = historyCityArray[0].location.name;

  firstCityName.textContent = cityName;
  secondCityName.textContent = cityName;
  thirdCityName.textContent = cityName;
  fourthCityName.textContent = cityName;
  fifthCityName.textContent = cityName;

  firstPhrase.textContent =
    historyCityArray[4].forecast.forecastday[0].day.condition.text;
  secondPhrase.textContent =
    historyCityArray[3].forecast.forecastday[0].day.condition.text;
  thirdPhrase.textContent =
    historyCityArray[2].forecast.forecastday[0].day.condition.text;
  fourthPhrase.textContent =
    historyCityArray[1].forecast.forecastday[0].day.condition.text;
  fifthPhrase.textContent =
    historyCityArray[0].forecast.forecastday[0].day.condition.text;

  firstImage.src =
    historyCityArray[4].forecast.forecastday[0].day.condition.icon;
  secondImage.src =
    historyCityArray[3].forecast.forecastday[0].day.condition.icon;
  thirdImage.src =
    historyCityArray[2].forecast.forecastday[0].day.condition.icon;
  fourthImage.src =
    historyCityArray[1].forecast.forecastday[0].day.condition.icon;
  fifthImage.src =
    historyCityArray[0].forecast.forecastday[0].day.condition.icon;

  if (document.getElementById('cf-button').textContent === 'C') {
    firstTempText.textContent = `${historyCityArray[4].forecast.forecastday[0].day.avgtemp_c}°C`;
    secondTempText.textContent = `${historyCityArray[3].forecast.forecastday[0].day.avgtemp_c}°C`;
    thirdTempText.textContent = `${historyCityArray[2].forecast.forecastday[0].day.avgtemp_c}°C`;
    fourthTempText.textContent = `${historyCityArray[1].forecast.forecastday[0].day.avgtemp_c}°C`;
    fifthTempText.textContent = `${historyCityArray[0].forecast.forecastday[0].day.avgtemp_c}°C`;
  } else {
    firstTempText.textContent = `${historyCityArray[4].forecast.forecastday[0].day.avgtemp_f}°F`;
    secondTempText.textContent = `${historyCityArray[3].forecast.forecastday[0].day.avgtemp_f}°F`;
    thirdTempText.textContent = `${historyCityArray[2].forecast.forecastday[0].day.avgtemp_f}°F`;
    fourthTempText.textContent = `${historyCityArray[1].forecast.forecastday[0].day.avgtemp_f}°F`;
    fifthTempText.textContent = `${historyCityArray[0].forecast.forecastday[0].day.avgtemp_f}°F`;
  }

  const parsedFirstDate = parse(
    historyCityArray[4].forecast.forecastday[0].date,
    'yyyy-MM-dd',
    new Date()
  );
  const parsedSecondDate = parse(
    historyCityArray[3].forecast.forecastday[0].date,
    'yyyy-MM-dd',
    new Date()
  );
  const parsedThirdDate = parse(
    historyCityArray[2].forecast.forecastday[0].date,
    'yyyy-MM-dd',
    new Date()
  );
  const parsedFourthDate = parse(
    historyCityArray[1].forecast.forecastday[0].date,
    'yyyy-MM-dd',
    new Date()
  );
  const parsedFifthDate = parse(
    historyCityArray[0].forecast.forecastday[0].date,
    'yyyy-MM-dd',
    new Date()
  );

  firstDate.textContent = format(parsedFirstDate, 'MMM dd');
  secondDate.textContent = format(parsedSecondDate, 'MMM dd');
  thirdDate.textContent = format(parsedThirdDate, 'MMM dd');
  fourthDate.textContent = format(parsedFourthDate, 'MMM dd');
  fifthDate.textContent = format(parsedFifthDate, 'MMM dd');
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

  const firstTemp = document.getElementById('first-temp');
  const secondTemp = document.getElementById('second-temp');
  const thirdTemp = document.getElementById('third-temp');
  const fourthTemp = document.getElementById('fourth-temp');
  const fifthTemp = document.getElementById('fifth-temp');

  if (tempButton.textContent === 'C') {
    tempText.textContent = `${currentCityObject.current.temp_f}°F`;
    todayTemp.textContent = `${forecastCityObject.forecast.forecastday[0].day.avgtemp_f}°F`;
    tomorrowTemp.textContent = `${forecastCityObject.forecast.forecastday[1].day.avgtemp_f}°F`;
    afterTemp.textContent = `${forecastCityObject.forecast.forecastday[2].day.avgtemp_f}°F`;
    firstTemp.textContent = `${historyCityArray[4].forecast.forecastday[0].day.avgtemp_f}°F`;
    secondTemp.textContent = `${historyCityArray[3].forecast.forecastday[0].day.avgtemp_f}°F`;
    thirdTemp.textContent = `${historyCityArray[2].forecast.forecastday[0].day.avgtemp_f}°F`;
    fourthTemp.textContent = `${historyCityArray[1].forecast.forecastday[0].day.avgtemp_f}°F`;
    fifthTemp.textContent = `${historyCityArray[0].forecast.forecastday[0].day.avgtemp_f}°F`;
    tempButton.textContent = 'F';
  } else {
    tempText.textContent = `${currentCityObject.current.temp_c}°C`;
    todayTemp.textContent = `${forecastCityObject.forecast.forecastday[0].day.avgtemp_c}°C`;
    tomorrowTemp.textContent = `${forecastCityObject.forecast.forecastday[1].day.avgtemp_c}°C`;
    afterTemp.textContent = `${forecastCityObject.forecast.forecastday[2].day.avgtemp_c}°C`;
    firstTemp.textContent = `${historyCityArray[4].forecast.forecastday[0].day.avgtemp_c}°C`;
    secondTemp.textContent = `${historyCityArray[3].forecast.forecastday[0].day.avgtemp_c}°C`;
    thirdTemp.textContent = `${historyCityArray[2].forecast.forecastday[0].day.avgtemp_c}°C`;
    fourthTemp.textContent = `${historyCityArray[1].forecast.forecastday[0].day.avgtemp_c}°C`;
    fifthTemp.textContent = `${historyCityArray[0].forecast.forecastday[0].day.avgtemp_c}°C`;
    tempButton.textContent = 'C';
  }
}

function convertListener() {
  const temperatureButton = document.getElementById('cf-button');
  temperatureButton.addEventListener('click', () => {
    convertTemperature();
  });
}

function getLastDays() {
  const today = new Date();

  const previousDays = [];

  for (let i = 1; i <= 5; i++) {
    const previousDate = subDays(today, i);
    const formattedDate = format(previousDate, 'yyyy-MM-dd');
    previousDays.push(formattedDate);
  }
  return previousDays;
}

export async function searchCity(cityName) {
  try {
    currentCityObject = await fetchCurrentCity(cityName);
    forecastCityObject = await fetchForecastCity(cityName);
    const lastDays = getLastDays();
    historyCityArray = await fetchHistoryCity(cityName, lastDays);
    changeCurrentCity();
    changeForecastCities();
    changeHistoryCities();
    console.log(currentCityObject);
    console.log(forecastCityObject);
    console.log(historyCityArray);
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
