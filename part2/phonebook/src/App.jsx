import { useState } from 'react'

const NameDisplay = ({ name, phone }) => {
  return (
    <p>{name} {phone}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '734-9238' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const nameUpdate = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const phoneUpdate = (event) => {
    console.log(event.target.value)
    setNewPhone(event.target.value)
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
      let newPersonObject = { name: newName, phone: newPhone }
      newPersons.push(newPersonObject)
      setPersons(newPersons)
      setNewName('')
      setNewPhone('')
      }
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
      <ul>
        {
          persons.map(person => 
            <NameDisplay key={person.name} name={person.name} phone={person.phone}/>
          )
        }
      </ul>
    </div>
  )
}

export default App