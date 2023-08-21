export async function fetchCurrentCity(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=a546a5e4168344e08a0184328231408&q=${city}`
    );
    const responseJSON = await response.json();
    return responseJSON;
  } catch (e) {
    throw new Error(e);
  }
}

export async function fetchForecastCity(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=a546a5e4168344e08a0184328231408&q=${city}&days=3
      `
    );
    const responseJSON = await response.json();
    return responseJSON;
  } catch (e) {
    throw new Error(e);
  }
}

export async function fetchHistoryCity(city, date) {
  try {
    const history = [];
    for (let i = 0; i < 5; i++) {
      const response = fetch(
        `https://api.weatherapi.com/v1/history.json?key=a546a5e4168344e08a0184328231408&q=${city}&dt=${date[i]}
        `
      );
      history.push(response);
    }

    const responses = await Promise.all(history);
    const responsesJSONs = await Promise.all(
      responses.map((response) => response.json())
    );
    return responsesJSONs;
  } catch (e) {
    throw new Error(e);
  }
}
