//GETTING ALL DOM Objects.

const form = document.querySelector('form');
const city = document.getElementById('city');
const submitButton = document.getElementById('btn');
const weatherDisplay = document.querySelector('.weather');
const specifiedLocation = document.querySelector('.location');
const temperature = document.querySelector('.temperature');
const mainWeather = document.querySelector('.main-weather');
const locationIcon = document.querySelector('#location-icon');
const alert = document.querySelector('.alert');

form.addEventListener('submit' ,(e) => {
    e.preventDefault( );

    const weather = async ( ) => {

        var cityName = city.value.toLowerCase( );
        const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=abeokuta&APPID=b34fddd3dae4a2eb0ad363b62f98ba1e');
        if(response.status !== 200 || response.status == 404){ 
            throw new Error('Error fetching data');
        }

       
    
        const data = await response.json( );
        return data;
    };
    
    weather( ).then(data => {
        alert.style.display = 'none';
        let temperatureInCelcius = Math.floor(data.main.temp - 273);
        specifiedLocation.innerText = (city.value + ", " + data.sys.country + '.');
        temperature.innerText = temperatureInCelcius + "'C";
        mainWeather.innerText = (data.weather[0].main + ', ' + data.weather[0].description + '.');
        locationIcon.style.display = 'block';
        weatherDisplay.style.display ="block";

    }).catch(error => {
        console.log(`Promise rejected: `, error.message);
       
         alert.style.display = 'block';
         weatherDisplay.style.display ="none";
        
    });
});

city.addEventListener('focus', ( ) => {
    alert.style.display = 'none';
    weatherDisplay.style.display = 'none';
});
