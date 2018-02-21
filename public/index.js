const app = function(){
  const url = "https://restcountries.eu/rest/v2/all";

  const countriesButton = document.querySelector('button');
  countriesButton.addEventListener('click', buttonHandler);

  const buttonHandler = function(){
    makeRequest(url, requestComplete);
  }

  const countrySelector = document.getElementById('#country-selector')
  countrySelector.addEventListener('change', changeHandler);

  const changeHandler = function(){
    console.log("Hi! I'm working! Sort of.");
  }

}


const makeRequest = function(url, callback){
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callback);
  request.send();
}


const requestComplete = function(){
  if(this.status !== 200) return; //'this' accesses the request object from the makeRequest function that this function is called within
  const jsonString = this.responseText; //comes back as a string
  const countries = JSON.parse(jsonString); //converts that string back to an array
  populateList(countries);
}


const populateList = function(countries){
  const ul = document.getElementById('country-list');
  countries.forEach(function(country){
    const li = document.createElement('li')
    li.innerText = country.name;
    ul.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', app);
