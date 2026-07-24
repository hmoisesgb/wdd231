const weatherDesc = document.querySelector('#weatherDescription');
const weatherIcon = document.querySelector('#weatherIcon');
const date = new Date();
const dateHTML = document.querySelector("#currentDate");
const weatherContainer = document.querySelector("#weather");

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=14.64&lon=-90.51&units=imperial&appid=3637031259467a0e65ab88aab5bc72ac';
const forecastURL ='https://api.openweathermap.org/data/2.5/forecast?lat=14.64&lon=-90.51&appid=3637031259467a0e65ab88aab5bc72ac&units=imperial';

async function apiFetch(){
    try {
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            displayWeather(data);
        } else {
            throw Error(await response.text());
        }

    } catch (error) {
        console.log(error);
    }
}

async function forecastFetch(){
    try {
        const response = await fetch(forecastURL);

        if (response.ok) {
            const data = await response.json();
            displayWeatherForecast(data.list);
        } else {
            throw Error(await response.text());
        }

    } catch (error) {
        console.log(error);
    }
}

function displayWeather(data) {
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('src',iconsrc);
    weatherIcon.setAttribute('alt',desc);
    weatherIcon.setAttribute('loading','lazy');
    weatherDesc.innerHTML=`${data.main.temp}&deg;F - ${desc}`;
    dateHTML.innerHTML = date.toLocaleDateString();
}

function displayWeatherForecast(data) {
    const forecastDays = [8,16,24];
    let dateIndex = 1
    forecastDays.forEach((i, index) =>{
        let desc = data[i].weather[0].description;
        let futureDate = new Date(date);
        futureDate.setDate(date.getDate()+dateIndex);

        let container = document.createElement('div');
        container.classList.add("container");

        let dateContainer = document.createElement('p');
        dateContainer.classList.add("dateContainer");
        dateContainer.textContent = futureDate.toLocaleDateString();

        let icon = document.createElement('img');
        let iconsrc= `https://openweathermap.org/img/wn/${data[i].weather[0].icon}.png`;
        icon.setAttribute('src',iconsrc);
        icon.setAttribute('alt',desc);
        icon.setAttribute('loading','lazy');

        let p = document.createElement('p');
        let description = document.createElement('span');
        description.innerHTML = `${data[i].main.temp}&deg;F - ${desc}`;

        p.appendChild(description);

        container.appendChild(dateContainer);
        container.appendChild(icon);
        container.appendChild(p);

        weatherContainer.appendChild(container);
        dateIndex++;
    })
}

apiFetch();
forecastFetch();