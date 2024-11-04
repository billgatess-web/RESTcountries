const countryName =  new URLSearchParams(location.search).get('name')
const flagImage = document.querySelector(".country-details img")
const countryNameH1 = document.querySelector(".country-details h1")
const nativeName = document.querySelector(".native-name")
const population = document.querySelector(".population")
const region = document.querySelector(".region")
const subRegion = document.querySelector(".sub-region")
const capital = document.querySelector(".capital")
const TopLevelDomain = document.querySelector(".top-level-domain")
const currencies = document.querySelector(".currency")
const languages = document.querySelector(".languages")
const borderCountries = document.querySelector(".border-countries")
const themeChangerCountry = document.querySelector(".theme-changer-country")


fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`).then((res)=> res.json())
.then(([country])=>{
    console.log(country)
    flagImage.src = country.flags.svg ;
    countryNameH1.innerText = country.name.common ;
    population.innerText = country.population.toLocaleString('hi-IN');
    region.innerText = country.region
    
    TopLevelDomain.innerText = country.tld.join(', ');
    


    if(country.capital){
      capital.innerText = country.capital?.[0]
    }

    if(country.subregion){
      subRegion.innerText = country.subregion
    }

    if(country.name.nativeName){
        nativeName.innerText = Object.values(country.name.nativeName)[0].common ;
      } else{
        nativeName.innerText = country.name.common
      }

      if(country.currencies){
        currencies.innerText = Object.values(country.currencies).map((currency) => currency.name).join(', ')
       }

      if(country.languages){
        languages.innerText = Object.values(country.languages).join(', ');
      }

      if(country.borders){
        country.borders.forEach(border => {
          fetch(`https://restcountries.com/v3.1/alpha/${border}`).then((res) => res.json())
          .then(([borderCountry]) => {
            // console.log(borderCountry) 
            const borderCountryTag = document.createElement("a")
            borderCountryTag.innerText = borderCountry.name.common
            borderCountryTag.href = `http://127.0.0.1:5500/JS%20Projects/RESTcountries%20Project/country.html?name=${borderCountry.name.common}`
            console.log(borderCountryTag);
            borderCountries.append(borderCountryTag)
          })
        });
      }
})

themeChangerCountry.addEventListener("click", () => {
  document.body.classList.toggle("dark-country");

  if (themeChanger.innerHTML.includes('<i class="fa-regular fa-moon"></i>')) {
    themeChangerCountry.innerHTML = `<i class="fa-regular fa-sun"></i> &nbsp;Light Mode`;
  } else {
    themeChangerCountry.innerHTML = `<i class="fa-regular fa-moon"></i> &nbsp;Dark Mode`;
  }
});