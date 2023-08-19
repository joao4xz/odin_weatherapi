export default async function fetchCity(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=a546a5e4168344e08a0184328231408&q=${city}`
    );
    const responseJSON = await response.json();
    console.log('Completed!');
    return responseJSON;
  } catch (e) {
    throw new Error(e);
  }
}
