const apiKey = '8419ea22e5fd01bf76fa19e47517de52'; // Replace with your OpenWeatherMap API key
const weatherContainer = document.getElementById('weather-container');
const locationEl = document.getElementById('location');
const tempEl = document.getElementById('temperature');
const descEl = document.getElementById('description');
const humidityEl = document.getElementById('humidity');
const iconEl = document.getElementById('weather-icon');

function setWeatherBackground(weather) {
  const lower = weather.toLowerCase();
  if (lower.includes('cloud')) {
    weatherContainer.style.background = '#d6dbe2';
  } else if (lower.includes('sun') || lower.includes('clear')) {
    weatherContainer.style.background = '#ffe9a7';
  } else if (lower.includes('rain')) {
    weatherContainer.style.background = '#c2d7f2';
  } else if (lower.includes('snow')) {
    weatherContainer.style.background = '#f0faff';
  } else {
    weatherContainer.style.background = '#fff8f5';
  }
}

function getWeatherIcon(id) {
  return `https://openweathermap.org/img/wn/${id}@2x.png`;
}

function fetchWeather(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const { name } = data;
      const { temp, humidity } = data.main;
      const { description, icon, main } = data.weather[0];

      locationEl.textContent = name;
      tempEl.textContent = `Temperature: ${Math.round(temp)}°C`;
      descEl.textContent = `Description: ${description.charAt(0).toUpperCase() + description.slice(1)}`;
      humidityEl.textContent = `Humidity: ${humidity}%`;
      iconEl.innerHTML = `<img src="${getWeatherIcon(icon)}" alt="weather icon" />`;

      setWeatherBackground(main);
    })
    .catch(err => {
      locationEl.textContent = 'Weather data unavailable';
      tempEl.textContent = '';
      descEl.textContent = '';
      humidityEl.textContent = '';
      iconEl.innerHTML = '';
    });
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
      },
      () => {
        locationEl.textContent = 'Location access denied';
      }
    );
  } else {
    locationEl.textContent = 'Geolocation not supported';
  }
}

getLocation();