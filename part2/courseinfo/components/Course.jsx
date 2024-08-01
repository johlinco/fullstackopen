const Course = (props) => {
    console.log(props.course.name)
    // const Header = (props) => {
    //   console.log("header props", props)
    //   return (
    //     <h1>{props.name}</h1>
    //   )
    // }
    
    // const Part = (props) => {
    //   console.log("part props", props)
    //   return (
    //     <p>
    //       {props.part.name} {props.part.exercises}
    //     </p>
    //   )
    // }
    
    // const Total = (props) => {
    //   console.log("Total Props", props)
    //   return (
    //     <p>Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
    //   )
    // }
  
  
    // const Content = (props) => {
    //   console.log("Content Props", props)
    //   return (
    //     <div>
    //       <Part part={props.course.parts[0]} exercise={props.course.parts[0]} />
    //       <Part part={props.course.parts[1]} exercise={props.course.parts[1]} />
    //       <Part part={props.course.parts[2]} exercise={props.course.parts[2]} />
    //     </div>
    //   )
    // }
  
  
    return (
      <div>
        {/* <Header course={course} />
        <Content course={course}/>
        <Total course={course}/> */}
        <h1>{props.course.name}</h1>
      </div>
    )
  }
  
  export default Course