
export default  function fetchCountries(searchQuery) {
      const option = {
        headers: {}
      }
      const URL = `https://restcountries.eu/rest/v2/name/${searchQuery}`
      return fetch(URL, option)
            .then(response => response.json())
            .then(data => data);
}
