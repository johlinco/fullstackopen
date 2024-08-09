import { useState, useEffect } from 'react'
import Filter from '/components/Filter'
import axios from 'axios'


const LanguageToDisplay = ({ language }) => {
  return (
    <li key={language}>{language}</li>
  )
}

const CountryView =({ languageList, commonName, capital, area, flagUrl, flagAlt }) => {
  return (
    <div>
        <h1>{commonName}</h1>
        <p>capital {capital}</p>
        <p>area {area}</p>
        <p><strong>languages</strong></p>
        <ul>
          {languageList.map(language => 
            <LanguageToDisplay key={language} language={language} />  
          )}

        </ul>
        <img src={flagUrl} alt={flagAlt} ></img>
      </div>
  )
}


const Display = ({ countryList, handleSelectedCountry }) => {

  if (countryList.length === 1) {
    const filteredLanguages = Object.values(countryList[0].languages)
    return (
      <div>
        <CountryView 
          languageList={filteredLanguages} 
          commonName={countryList[0].name.common}
          capital={countryList[0].capital}
          area={countryList[0].area}
          flagUrl={countryList[0].flags.png}
          flagAlt={countryList[0].flags.alt}
        />
      </div>
    )
  } else if (countryList.length < 10) {
    return (
      <div>
        <ul>
          {
            countryList.map(country =>
              <div>
                <p key={country.name.common}>{country.name.common}</p>
                <button 
                  key={country.name.commom}
                  onClick={() => handleSelectedCountry(country.name.common)}
                >
                  Show {country.name.common}
                </button>
              </div>
            )
          }
        </ul>
      </div>
    )
  } else {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }

}


function App() {
  const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

  const [searchText, setSearchText] = useState('')
  const [allCountries, setAllCountries] = useState([])

  useEffect(() => {
    const request = axios.get(baseUrl)
    request.then(response => response.data)
      .then(initialCountries => {
        setAllCountries(initialCountries)
      })
  },[])


  const searchTextUpdate = (event) => {
    setSearchText(event.target.value)
  }

  const handleSelectedCountry = (country) => { 
    setSearchText(country)
  }


  const countriesToShow = searchText.length === 0 
  ? allCountries 
  : allCountries.filter(country => country.name.common.toLowerCase().includes(searchText.toLowerCase()))

  console.log(countriesToShow)

  return (
    <>
      <Filter 
        searchText={searchText} 
        searchTextUpdate={searchTextUpdate} 
      />
      <Display 
        countryList={countriesToShow} 
        handleSelectedCountry={handleSelectedCountry}
      />
      <button onClick={() => setSearchText('')}>Clear</button>
    </>
  )
}

export default App
