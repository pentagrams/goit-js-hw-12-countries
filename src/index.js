import './styles.css';
const debounce = require('lodash.debounce');
import API from './js/fetchCountries';
import CountryCardTpl from './tpl/CountryCardTpl.hbs'


const refs = {
      cardContainer: document.querySelector('.js-card-container'),
      searchForm: document.querySelector('.js-search-form'),

}

refs.searchForm.addEventListener('input', onSearch)

function onSearch(event) {
      event.preventDefault();

      const form = event.currentTarget;
      const searchQuery = form.elements.query.value;

      API.fetchCountries(searchQuery)
            .then(renderCountryCard)
            .catch(onFetchError);
}

function renderCountryCard(country) {
      const markup = CountryCardTpl(country);
      refs.cardContainer.innerHTML = markup;
}


function onFetchError(error) {
      alert('Ошибка!')
}

