const countriesContainer = document.querySelector('.countries-container');
const filterByRegion = document.querySelector('.filter-by-region');
const searchInput = document.querySelector('.search-container input');
const themeChanger = document.querySelector('.theme-changer');

let allCountriesData

document.addEventListener('DOMContentLoaded', () => {
  if (countriesContainer) {
    // Show a loading indicator
    countriesContainer.innerHTML = '<p>Loading countries...</p>';
  }

  fetch("https://restcountries.com/v3.1/all")
    .then((res) => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then((data) => {
      renderCountries(data)
      allCountriesData = data
    })
});

filterByRegion.addEventListener('change', (e)=> {
  fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then(renderCountries)
})

function renderCountries(data){
  if (countriesContainer) {
    countriesContainer.innerHTML = '';
  }
  data.forEach((country) => {
    const countryCard = document.createElement("a");
    countryCard.classList.add("country-card");
    countryCard.href = `/JS%20Projects/RESTcountries%20Project/country.html?name=${country.name.common}`;

    countryCard.innerHTML = `
      <img src="${country.flags.svg}" alt="Flag of ${country.name.common}">
      <div class="card-text">
        <h3 class="card-title">${country.name.common}</h3>
        <p><b>Population: </b>${country.population.toLocaleString('hi-IN')}</p>
        <p><b>Region: </b>${country.region}</p>
        <p><b>Capital: </b>${country.capital?.[0] || 'N/A'}</p>
      </div>
    `;
    countriesContainer.append(countryCard);
  });
}


searchInput.addEventListener("input", (e)=> {
  const filteredCountries = allCountriesData.filter((country)=> country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
  console.log(filteredCountries)
  renderCountries(filteredCountries)
});


themeChanger.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (themeChanger.innerHTML.includes('<i class="fa-regular fa-moon"></i>')) {
    themeChanger.innerHTML = `<i class="fa-regular fa-sun"></i> &nbsp;Light Mode`;
  } else {
    themeChanger.innerHTML = `<i class="fa-regular fa-moon"></i> &nbsp;Dark Mode`;
  }
});