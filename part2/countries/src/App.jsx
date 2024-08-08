import { useState, useEffect } from 'react'
import Filter from '/components/Filter'
import axios from 'axios'


const LanguageToDisplay = ({ language }) => {
  return (
    <li key={language}>{language}</li>
  )
}

const Display = ({ countryList }) => {

  if (countryList.length === 1) {
    const filteredLangages = Object.values(countryList[0].languages)
    return (
      <div>
        <h1>{countryList[0].name.common}</h1>
        <p>capital {countryList[0].capital}</p>
        <p>area {countryList[0].area}</p>
        <p><strong>languages</strong></p>
        <ul>
          {filteredLangages.map(language => 
            <LanguageToDisplay language={language} />  
          )}

        </ul>
        <img src={countryList[0].flags.png} alt={countryList[0].flags.alt} ></img>
      </div>
    )
  } else if (countryList.length < 10) {
    return (
      <div>
        <ul>
          {
            countryList.map(country =>
              <p>{country.name.common}</p>
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

  const countriesToShow = searchText.length === 0 
  ? allCountries 
  : allCountries.filter(country => country.name.common.toLowerCase().includes(searchText.toLowerCase()))

  console.log(countriesToShow)

  return (
    <>
      <Filter searchText={searchText} searchTextUpdate={searchTextUpdate} />
      <Display countryList={countriesToShow}/>
    </>
  )
}

export default App
