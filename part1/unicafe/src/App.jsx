import { useState } from 'react'

const Statistics = (props) => {

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
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {props.all}</p>
      <p>average {(props.good - props.bad) / props.all}</p>
      <p>positive {(props.good / props.all) * 100}%</p>
    </div>
  )

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  
  const goodClick = () => {
    setGood(good + 1)
    setAll(all + 1)
  }

  const badClick = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }

  const neutralClick = () => {
    setAll(all + 1)
  }



  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={goodClick}>good</button>
      <button onClick={neutralClick}>neutral</button>
      <button onClick={badClick}>bad</button>
      <Statistics good={good} bad={bad} neutral={neutral} all={all} />
    </div>
  )
}

export default App