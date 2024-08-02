import { useState } from 'react'

const NameDisplay = ({ name, number }) => {
  return (
    <p>{name} {number}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [searchText, setSearchText] = useState('')

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
      filter shown with:
      <input 
        onChange={searchTextUpdate}
        value={searchText}
      />
      <form onSubmit={addNewName}>
        <h2>add a new contact</h2>
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