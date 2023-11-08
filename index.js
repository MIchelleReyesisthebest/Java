const container = document.querySelector('.container'); //separated by class ==The class attribute is often used to point to a class name in a style sheet. It can also be used by a JavaScript to access and manipulate elements with the specific class name.
const search = document.querySelector('.search-box button'); // document.quey... takes the class in (".className.")
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => { //addEventListener(event, function() {usercapture} ) => event = click and evalutes the function 
 //start of addEvent... 
    const APIKey = '0ecb7923c187b587881d4b6de0401b38';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return; // nothing

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'image/clear.png';
                    break;

                case 'Rain':
                    image.src = 'image/rain.png';
                    break;

                case 'Snow':
                    image.src = 'image/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'image/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'image/mist.png';
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°F</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';


        });


}




); /// end of the addevent..
