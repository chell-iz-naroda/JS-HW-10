import './css/styles.css';
import 'notiflix/dist/notiflix-3.2.6.min.css'
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries';
import Notiflix from 'notiflix';


const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(onSearchInput, DEBOUNCE_DELAY));


function onSearchInput(event) {
    const searchQuery = event.target.value.trim();
  
    if (searchQuery === '') {
      clearCountryList();
      clearCountryInfo();
      return;
    }

    fetchCountries(searchQuery)
      .then(countries => {
        if (countries.length > 10) {
          Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
          clearCountryList();
          clearCountryInfo();
          return;
        }
  
        if (countries.length >= 2 && countries.length <= 10) {
            console.log(countries);
          renderCountryList(countries);
          clearCountryInfo();
          return;
        }
  
        if (countries.length === 1) {
          renderCountryInfo(countries[0]);
          clearCountryList();
          return;
        }
  
        Notiflix.Notify.failure('Oops, something went wrong');
      })
      .catch(error => {
        Notiflix.Notify.failure('Oops, something went wrong');
      });
  }
  
  function clearCountryList() {
    countryList.innerHTML = '';
  }
  
  function clearCountryInfo() {
    countryInfo.innerHTML = '';
  }
  
  function renderCountryList(countries) {
    const markup = countries
      .map(country => `<li> <img src="${country.flags.svg}" alt="${country.name} flag" width=32px> ${country.name}</li>`)
      .join('');
  
    countryList.innerHTML = markup;
    countryList.style.padding = `0`;
    countryList.style.listStyle = 'none';

  const listItems = countryList.querySelectorAll('li');
  listItems.forEach(item => {
    item.style.display = `flex`;
    item.style.padding = '8px';
    item.style.marginBottom = '4px';
  });

  const images = countryList.querySelectorAll('img');
  images.forEach(img => {
    img.style.marginRight = '8px';
  });
  }

function renderCountryInfo(country) {
    const { name, capital, population, flags, languages } = country;
    const languageNames = Object.values(languages).map(language => language.name).join(', ');
  
    const markup = `
    <h1 style="font-size: 2.5rem; font-weight: bold">  <img src="${flags.svg}" alt="${name} flag" width=48px> ${name}</h1>
    <p style="font-size: 1.5rem"><b>Capital:</b> ${capital}</p>
    <p style="font-size: 1.5rem"><b>Population:</b> ${population}</p>
    <p style="font-size: 1.5rem"><b>Languages:</b> ${languageNames}</p>
  `;

const countryInfo = document.querySelector('.country-info');
countryInfo.innerHTML = markup;
}