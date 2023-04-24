async function fetchCountries(name) {
    const response = await fetch(`https://restcountries.com/v2/name/${name}`);
    const countries = await response.json();
    return countries;
  }
  
  export default fetchCountries;