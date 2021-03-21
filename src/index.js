import './styles.css';
import 'lodash';
import fetchCountries from './js/fetchCountries';
import countryCardTpl from './templates/CountryCardTpl.hbs'
import countriesListTpl from './templates/list.hbs'
const { error }  = require('@pnotify/core');



const refs = {
      cardContainer: document.querySelector('.js-card-container'),
      searchForm: document.querySelector('.js-search-form'),
}



refs.searchForm.addEventListener('input', _.debounce(onSearch, 500));


function onSearch(event) {
      event.preventDefault();
      clearCountriesList()

      // const form = event.currentTarget;
      const searchQuery = form.elements.query.value.trim();
      
      if (searchQuery.length === 0) {
            return
      } else {
           return fetchCountries(searchQuery)
            .then(findDesirableCountry)
            .catch(onFetchError); 
      }
}

function onFetchError(error) {
      console.log('Error!', error);
}

function renderCountryCard(country) {
      refs.cardContainer.insertAdjacentHTML("beforeend",countryCardTpl(country))
}

function renderCountriesList(countries) {
    refs.cardContainer.insertAdjacentHTML("beforeend",countriesListTpl(countries))
}


function clearCountriesList() {
    refs.countriesContainer.innerHTML = '';
}

function findDesirableCountry(data) {
      if (data.length > 10) {
            error({
                  delay: 1000,
                  text: 'Too many matches found. Please try a more specific query',
                  type: 'info'
            });
      } else if (data.length === 1) {
            renderCountryCard(data);
      } else if (ata.length === undefined) {
            error({
                delay: 1000,
                text: 'Incorrect name of the counrty. Please check and try again',
                type: 'info'
                });
      } else {
            renderCountriesList(data);
      }
}
