const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old.</p>
    </div>
  )
}

const App = () => {
  const name = "Lanie"
  const age = 32

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Lincoln" age="38"/>
      <Hello name={name} age={age}/>
      <Hello />
    </div>
  )
}

export default App