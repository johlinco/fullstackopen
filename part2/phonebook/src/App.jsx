import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const NameDisplay = ({ name, number, deletePerson }) => {
  return (
    <div>
      <p>{name} {number}</p>
      <button onClick={deletePerson}>delete</button>
    </div>
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

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  })

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
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        const newPersonObject = {...persons[i], phone: newPhone}
        if (window.confirm('Are you sure you want to update phone number for this person?')) {
          personService
            .update(persons[i].id, newPersonObject)
            .then(updatedPerson => {
              setPersons(persons.map(person => person.id === persons[i].id ? person : updatedPerson))
            })
        }
      }
    }

    if (newName.length > 0) {
      const newPersonObject = { 
        name: newName,
        number: newPhone 
      }
      personService
        .create(newPersonObject)
        .then(person => {
          setPersons(persons.concat(person))
          setNewName('')
          setNewPhone('')
        })
      }
  }

  const deletePerson = id => {
    if (window.confirm('Are you sure you want to delete this person?')) { 
      personService
      .deletePerson(id)
      .then(response => response)
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
            <NameDisplay 
              key={person.id} 
              name={person.name} 
              number={person.number}
              deletePerson={() => deletePerson(person.id)}
            />
          )
        }
      </ul>
    </div>
  )
}

export default App