import fetchCity from './fetch';

let cityObject;

function changeCurrentCity() {
  const cityName = document.getElementById('current-city');
  const tempText = document.getElementById('current-temp');
  const phrase = document.getElementById('current-phrase');
  const image = document.getElementById('current-icon');

  cityName.textContent = cityObject.location.name;

  if (document.getElementById('cf-button').textContent === 'C') {
    tempText.textContent = `${cityObject.current.temp_c}°C`;
  } else {
    tempText.textContent = `${cityObject.current.temp_f}°F`;
  }

  phrase.textContent = cityObject.current.condition.text;

  image.src = cityObject.current.condition.icon;
}

function handleInvalidCity() {
  const input = document.getElementById('search-input');
  input.classList.add('error');
  input.addEventListener('click', () => {
    input.classList.remove('error');
  });
}

function convertTemperature() {
  const tempText = document.getElementById('current-temp');
  const tempButton = document.getElementById('cf-button');
  console.log('Hey');

  if (tempButton.textContent === 'C') {
    tempText.textContent = `${cityObject.current.temp_f}°F`;
    tempButton.textContent = 'F';
  } else {
    tempText.textContent = `${cityObject.current.temp_c}°C`;
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
    cityObject = await fetchCity(cityName);
    changeCurrentCity();
    console.log(cityObject);
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
