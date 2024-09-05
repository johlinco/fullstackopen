import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import './index.css'

const Notification = ({ notificationMessage, successOrError }) => {

  return (
    <div className={successOrError === 'success' 
      ? 'success' 
      : successOrError === 'error'
        ? 'error'
        : 'successPending'
      }>
      {notificationMessage}
    </div>
  )
}

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
  const [notificationMessage, setNotificationMessage] = useState('')
  const [successOrError, setSuccessOrError] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  console.log(persons)

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
    let foundPersonIdx
    let updatedPersonObject = []
    for (let i = 0; i < persons.length; i++) {
      console.log(persons[i].name)
      if (persons[i].name === newName) {
        found = true
        foundPersonIdx = i
        updatedPersonObject = {
          ...persons[i],
          number: newPhone,
        }
        break
      }
    }

    if (newName.length > 0 && !found) {

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
          setNotificationMessage(`Added ${newPersonObject.name}`)
          setSuccessOrError('success')
          setTimeout(() =>  {
            setNotificationMessage('')
            setSuccessOrError(null);
          }, 5000)
        })
      }
    
    if (newName.length > 0 && found) {
      if (window.confirm('Are you sure you want to update phone number for this person?')) {
        personService
          .update(updatedPersonObject.id, updatedPersonObject)
          .then(updatedPerson => {
            const newPersons = persons.map(person => person.id === updatedPersonObject.id ? person : updatedPerson)
            setPersons(newPersons)
          })
          .catch(error => {
            setNotificationMessage(
              `Information for '${newName}' was already deleted from server`
            )
            setSuccessOrError('error')
            setPersons(persons.filter(n => n.id !== id))
            setTimeout(() =>  {
              setNotificationMessage('')
              setSuccessOrError(null);
            }, 5000)
          })
      }
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
      <Notification notificationMessage={notificationMessage} successOrError={successOrError} />
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