let obj;

function getWeather(lat,lng){
  let http = new XMLHttpRequest();
  let url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/a849cd7ee1e185d27d4542113dd2d7ef/${lat},${lng}?units=si&lang=bs&exclude=[minutely,hourly,daily]`;
  http.open('GET', url, true);
  http.send();
  http.onreadystatechange = function(){
    if(http.readyState==4 && http.status==200){
      obj = JSON.parse(http.responseText);
      console.log(obj);
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
    console.log(http.status)
    if(http.readyState==4 && http.status==200){
      console.log(http.responseText);
      data = JSON.parse(http.responseText);
      getWeather(data.results[0].geometry.lat,data.results[0].geometry.lng);
    }
  }
}