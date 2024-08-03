import { useState, useEffect } from 'react'
import axios from 'axios'

const NameDisplay = ({ name, number }) => {
  return (
    <p>{name} {number}</p>
  )
}

const Filter = ({ searchText, searchTextUpdate }) => {
  return (
    <div>
      filter shown with:
      <input 
        onChange={searchTextUpdate}
        value={searchText}
      />
    </div>
  )
}

const PersonForm = ({ addNewName, nameUpdate, newName, phoneUpdate, newPhone }) => {
  return (
    <form onSubmit={addNewName}>
        <div>
          <div>
            name: 
            <input 
              onChange={nameUpdate} 
              value={newName}
            />
          </div>
          <div>
            phone:
            <input 
              onChange={phoneUpdate} 
              value={newPhone}
            />
          </div>

        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [searchText, setSearchText] = useState('')

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])

  const contactsToShow = searchText.length === 0 
    ? persons 
    : persons.filter(person => person.name.toLowerCase().includes(searchText.toLowerCase()))

  const nameUpdate = (event) => {
    setNewName(event.target.value)
  }

  const phoneUpdate = (event) => {
    setNewPhone(event.target.value)
  }

  const searchTextUpdate = (event) => {
    setSearchText(event.target.value)
  }

  const addNewName = (event) => {
    event.preventDefault()
    let found = false
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        found = true
        alert(`${newName} is already added to phonebook`)
      }
    }
    if (newName.length > 0 && !found) {
      let newPersons = [...persons]
      let newPersonObject = { name: newName, number: newPhone }
      newPersons.push(newPersonObject)
      setPersons(newPersons)
      setNewName('')
      setNewPhone('')
      }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        searchText={searchText} 
        searchTextUpdate={searchTextUpdate}
      />
      <h2>add a new contact</h2>
      <PersonForm 
        addNewName={addNewName} 
        nameUpdate={nameUpdate} 
        newName={newName} 
        phoneUpdate={phoneUpdate} 
        newPhone={newPhone}
      />
      <h2>Numbers</h2>
      <ul>
        {
          contactsToShow.map(person => 
            <NameDisplay key={person.id} name={person.name} number={person.number}/>
          )
        }
      </ul>
    </div>
  )
}

export default App