let countriesArray = [];

const app = function(){
  const url = "https://restcountries.eu/rest/v2/all";

  // const buttonHandler = function(){
    // makeRequest(url, requestComplete);
  // }


  const lastCountry = JSON.parse(localStorage.getItem('lastCountry'));
  populateCountryDetails(lastCountry);

  const countries = makeRequest(url, requestComplete);
  console.log(countries);

  const changeHandler = function(){
    const currentCountry = countriesArray[this.value];
    populateCountryDetails(currentCountry);
    // console.log("You're doing great!");
    // const details = document.querySelector('#country-details')
    // const ul = document.createElement('ul');
    // const liName = document.createElement('li');
    // liName.innerText = currentCountry.name;
    // const liPopulation = document.createElement('li');
    // liPopulation.innerText = currentCountry.population;
    // const liCapitalCity = document.createElement('li');
    // liCapitalCity.innerText = currentCountry.capital;
    // ul.appendChild(liName);
    // ul.appendChild(liPopulation);
    // ul.appendChild(liCapitalCity);
    // // ul.innerText = "You're fabulous";
    // details.appendChild(ul);

    storeCurrentCountry(currentCountry);
  }

  // const countriesButton = document.querySelector('button');
  // countriesButton.addEventListener('click', buttonHandler);

  const countrySelector = document.getElementById('country-selector')
  countrySelector.addEventListener('change', changeHandler);

  makeRequest(url, requestComplete);
}

const storeCurrentCountry = function(country){
  const jsonCountry = JSON.stringify(country);
  localStorage.setItem('lastCountry', jsonCountry);
}

const populateCountryDetails = function(currentCountry){
  const ul = document.querySelector('#country-details')
  ul.innerText = " "
  const liName = document.createElement('li');
  liName.innerText = "Country: " + currentCountry.name;
  const liPopulation = document.createElement('li');
  liPopulation.innerText = "Population: " + currentCountry.population;
  const liCapitalCity = document.createElement('li');
  liCapitalCity.innerText = "Capital City: " + currentCountry.capital;
  ul.appendChild(liName);
  ul.appendChild(liPopulation);
  ul.appendChild(liCapitalCity);
}

const makeRequest = function(url, callback){
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callback);
  request.addEventListener('load', callback);
  request.send();
}


const requestComplete = function(){
  if(this.status !== 200) return; //'this' accesses the request object from the makeRequest function that this function is called within
  const jsonString = this.responseText; //comes back as a string
  const countries = JSON.parse(jsonString); //converts that string back to an array
  // populateList(countries);

  populateSelector(countries)
  countriesArray = countries;
}


const populateList = function(countries){
  const ul = document.getElementById('country-list');
  countries.forEach(function(country){
    const li = document.createElement('li')
    li.innerText = country.name;
    ul.appendChild(li);
  });
}

const populateSelector = function(countries){
  const selector = document.getElementById('country-selector');
  countries.forEach(function(country, index){
    const option = document.createElement('option')
    option.innerText = country.name;
    option.value = index;
    selector.appendChild(option);
  });
}

document.addEventListener('DOMContentLoaded', app);
