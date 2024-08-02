import { useState } from 'react'

const NameDisplay = ({ name }) => {
  return (
    <p>{name}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const nameUpdate = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const addNewName = (event) => {
    event.preventDefault()
    if (newName.length > 0) {
      let newPersons = [...persons]
      let newNameObject = { name: newName }
      newPersons.push(newNameObject)
      setPersons(newPersons)
      setNewName('')
      }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName}>
        <div>
          name: 
          <input 
            onChange={nameUpdate} 
            value={newName}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {
          persons.map(person => 
            <NameDisplay key={person.name} name={person.name} />
          )
        }
      </ul>
    </div>
  )
}

export default App