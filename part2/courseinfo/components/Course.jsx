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
        const total = parts.reduce((sum, part) => 
            sum + part.exercises, 0
        )
      return (
        <p>Number of exercises {total}</p>
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