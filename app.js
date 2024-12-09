// identify the elements that need to be manipulated in HTML

let valueSearch = document.getElementById('valueSearch');
let city = document.getElementById('city');
let temperature = document.getElementById('temperature');
let description = document.querySelector('.description');
let clouds = document.getElementById('clouds');
let humidity = document.getElementById('hummidity');
let pressure = document.getElementById('pressure');
let form = document.querySelector('form');
form.addEventListener('submit' ,(event) => {
    event.preventDefault();
    // checking to see if user has entered required data
    if(valueSearch.value != ''){
        // then proceed with further processing by calling api 'searchWeather'
        searchWeather();
    }
})

// id is the app id value to use the api
let id = '9505fd1df737e20152fbd78cdb289b6a';
// the url contains the weather api link
let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid='+id;
const searchWeather = () => {
    // to be able to call the api i used function fetch with the path of the url variable
    fetch(url + '&q=' + valueSearch.value)
    // once the response from the request is recieved it is converted to JSON
    .then(responsive => responsive.json())
    // data is the data returned
    .then(data => {
        console.log(data);
        // obtain data from dev tools, if value of code is 200 that means it has been found
        if(data.cod == 200){
            // from city find the figcaption, change its name to the text of the value returned by the api.
            city.querySelector('figcaption').innerText = data.name;
            // i copied the flags  path from html file and called it back here
            city.querySelector('img').src='https://flagsapi.com/'+data.sys.country+'/shiny/32.png';
           // i removed the default value, then used dev tools to get the value of the temperature
            temperature.querySelector('img').src='http://openweathermap.org/img/wn/'+data.weather[0].icon+'@4x.png';
            temperature.querySelector('figcaption span').innerText = data.main.temp;
            description.innerText = data.weather[0].description;
            clouds.innerText = data.clouds.all;
            humidity.innerText = data.main.humidity;
            pressure.innerText = data.main.pressure;
        }
})
}