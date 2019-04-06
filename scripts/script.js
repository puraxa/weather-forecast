let weather;

function getWeather(lat,lng){
  let http = new XMLHttpRequest();
  let url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/a849cd7ee1e185d27d4542113dd2d7ef/${lat},${lng}?units=si&lang=bs&exclude=[minutely,hourly,daily]`;
  http.open('GET', url, true);
  http.send();
  http.onreadystatechange = function(){
    if(http.readyState==4 && http.status==200){
      weather = JSON.parse(http.responseText);
      showForecast(weather);
    }
  }
}


function getLangLat(){
  let http = new XMLHttpRequest();
  let obj = document.getElementsByName('location')[0];
  let location = encodeURIComponent(obj.value);
  let url =  `https://api.opencagedata.com/geocode/v1/json?key=0179e876a4524198b2324e82123672f0&q=${location}`;
  let data;
  http.open('GET', url, true);
  http.send();
  http.onreadystatechange = function(){
    if(http.readyState==4 && http.status==200){
      data = JSON.parse(http.responseText);
      getWeather(data.results[0].geometry.lat,data.results[0].geometry.lng);
      localStorage.setItem('lat',data.results[0].geometry.lat);
      localStorage.setItem('lng',data.results[0].geometry.lng);
      localStorage.setItem('location',location);
    }
  }
}

function showForecast(weather){
  document.getElementById('forecast').innerHTML = `
  <div class="col-6">
    <img src="./images/${weather.currently.icon}.png" width="90%" height="auto" alt="${weather.currently.summary}">
  </div>
  <div class="col-6">
    <h1>${weather.currently.summary}</h1>
    <p >Temperatura: ${Math.round(weather.currently.temperature)}°C</p>
    <p >Vlaznost zraka: ${weather.currently.humidity*100}%</p>
    <p >Brzina vjetra: ${(weather.currently.windSpeed*3.6).toFixed(2)}km/h</p>
  </div>
    `;
}

function checkStorage(){
  let lat = localStorage.getItem('lat');
  let lng = localStorage.getItem('lng');
  let loc = localStorage.getItem('location');
  if(lat && lng){
    getWeather(lat,lng);
    document.getElementsByName('location')[0].value=loc;
  }
}