const Header = ({course}) => <h2>{course.name}</h2>


const Part = ({part}) => <p>
    {part.name} {part.exercises}
</p>
const Content = ({course}) => {
    return (<div>
        {course.parts.map((part, index) => <Part part={part} key={index}/>)}
    </div>)
}
const Total = ({course}) =>
    <h3>total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</h3>

const Course = ({course}) => <div>
    <Header course={course}/>
    <Content course={course}/>
    <Total course={course}/>
</div>

export default Course