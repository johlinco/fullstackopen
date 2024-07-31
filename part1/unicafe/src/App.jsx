import { useState } from 'react'

const Statistics = (props) => {

  console.log(
    props
  )
  if (props.all === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
      
    )
  }

  return (
    <div>
      <h1>Statistics</h1>
      <StatisticLine text='good' value={props.good} />
      <StatisticLine text='neutral' value={props.neutral} />
      <StatisticLine text='bad' value={props.bad} />
      <StatisticLine text='all' value={props.all} />
      <StatisticLine text='average' value={props.average} />
      <StatisticLine text='positive' value={props.positive} />
    </div>
  )
}

const StatisticLine = (props) => {
  return (
    <p>{props.text} {props.value}{props.text === "positive" ? "%" : ""}</p>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick} >
      {props.text}
    </button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)
  
  const goodClick = () => {
    setGood(good + 1)
    setAll(all + 1)
    setAverage((good - bad)/all)
    setPositive((good/all)*100)
  }

  const badClick = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setAverage((good - bad)/all)
    setPositive((good/all)*100)
  }

  const neutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
    setAverage((good - bad)/all)
    setPositive((good/all)*100)
  }



  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={goodClick} text='good' />
      <Button handleClick={neutralClick} text='neutral' />
      <Button handleClick={badClick} text='bad' />
      <Statistics good={good} bad={bad} neutral={neutral} all={all} average={average} positive={positive} />
    </div>
  )
}

export default App