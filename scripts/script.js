let obj;

function getWeather(){
  let http = new XMLHttpRequest();
  let url = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/a849cd7ee1e185d27d4542113dd2d7ef/43.856259,18.413076?units=si&lang=bs&exclude=[minutely,hourly,daily]';
  http.open('GET', url, true);
  http.send();
  http.onreadystatechange = function(){
    if(http.readyState==4 && http.status==200){
      obj = JSON.parse(http.responseText);
      console.log(obj);
    }
  }
}