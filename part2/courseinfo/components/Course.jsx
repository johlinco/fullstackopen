const Course = ({ course }) => {

    const Header = ({ name }) => {
      console.log("header props", name)
      return (
        <h1>{name}</h1>
      )
    }
    
    const Part = ({ part }) => {
      console.log("part props", part)
      return (
        <p>
          {part.name} {part.exercises}
        </p>
      )
    }
    
    const Total = ({ parts }) => {
        let sum = 0
        for (const part of parts) {
            sum += part.exercises
        }
      return (
        <p>Number of exercises {sum}</p>
      )
    }
  
    const Content = ({ parts }) => {
        return (
            <div>
                {
                    parts.map((part) => (
                        <Part key={part.id} part={part}/>
                    ))
                }
            </div>
        )
    }
  
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts}/>
      </div>
    )
  }
  
  export default Course