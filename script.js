const apiKey = 'c12e60754c42c6beacd0061f8e8e72fb'; // Ensure API key is correct
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');

// Event listener for the search button
searchButton.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location) {
        fetchWeather(location);  // Fetch weather data for the location
    } else {
        locationElement.textContent = 'Please enter a city name';  // Provide message if input is empty
    }
});

function fetchWeather(location) {
    // Construct the URL correctly using template literals
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    console.log('Fetching URL:', url);  // Log the URL to check if it's correctly formatted

    // Fetch data from OpenWeatherMap API
    fetch(url)
        .then(response => {
            // Check if the response is OK (status 200)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('API Response:', data);  // Log the full response to debug

            if (data.cod === 200) {  // Check if the response is successful
                locationElement.textContent = `${data.name}, ${data.sys.country}`;  // Display location name
                temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;  // Display temperature
                descriptionElement.textContent = data.weather[0].description;  // Display weather description
            } else {
                // If the city is not found or there's an error in the API response
                locationElement.textContent = 'City not found. Please try again.';
                temperatureElement.textContent = '';
                descriptionElement.textContent = '';
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            // Display a more specific error message
            locationElement.textContent = 'Failed to fetch data. Please check your connection.';
            temperatureElement.textContent = '';
            descriptionElement.textContent = '';
        });
}
