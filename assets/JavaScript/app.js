// Identify the elements that need to be manipulated in HTML
let valueSearch = document.getElementById('valueSearch');
let city = document.getElementById('city');
let temperature = document.getElementById('temperature');
let description = document.querySelector('.description');
let clouds = document.getElementById('clouds');
let humidity = document.getElementById('hummidity');
let pressure = document.getElementById('pressure');
let form = document.querySelector('form');
let main = document.querySelector('main');

// Add event listener to the form to handle submit events
form.addEventListener('submit', (event) => {
    event.preventDefault();
    // Check if the user has entered a city name
    if (valueSearch.value !== '') {
        // Call the searchWeather function to fetch weather data
        searchWeather();
    }
});

// API key for OpenWeatherMap
const apiKey = '8585c8e4e8436ff831f37834e7bbc43a';
// Base URL for the OpenWeatherMap API
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + apiKey;

// Function to fetch weather data from the API
const searchWeather = () => {
    // Construct the full URL with the city name
    const fullUrl = baseUrl + '&q=' + valueSearch.value;

    // Fetch data from the API
    fetch(fullUrl)
        .then(response => {
            if (!response.ok) {
                console.error('Network response was not ok:', response);
                throw new Error('Network response was not ok ' + response.statusText + ' - Status: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            // Check if the API request was successful
            if (data.cod === 200) {
                // Update the city name
                city.querySelector('figcaption').innerText = data.name;
                // Update the flag image
                city.querySelector('img').src = 'https://flagsapi.com/' + data.sys.country + '/shiny/32.png';
                // Update the weather icon
                temperature.querySelector('img').src = 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@4x.png';
                // Update the temperature
                temperature.querySelector('figcaption span').innerText = data.main.temp;
                // Update the weather description
                description.innerText = data.weather[0].description;
                // Update the cloud cover
                clouds.innerText = data.clouds.all;
                // Update the humidity
                humidity.innerText = data.main.humidity;
                // Update the pressure
                pressure.innerText = data.main.pressure;
            } else {
                // Add an error class to the main element
                main.classList.add('error');
                // Remove the error class after 1 second
                setTimeout(() => {
                    main.classList.remove('error');
                }, 1000);
            }

            // Clear the input field after the search
            valueSearch.value = '';
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            console.error('Full error object:', error);
        });
};

// Initialize the app with a default city
const initApp = () => {
    valueSearch.value = 'London';
    searchWeather();
};

// Call the initApp function to start the app
initApp();
