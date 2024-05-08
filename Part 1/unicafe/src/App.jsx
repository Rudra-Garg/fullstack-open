import {useState} from 'react'

const StatisticLine = ({text, value}) => {
    if (text === "positive") {
        return (
            <tr>
                <td>{text}</td>
                <td>{value}%</td>
            </tr>
        )
    }
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}
const Statistics = (props) => {
    if (props.total === 0) {
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )
    }
    return (
        <table>
            <tbody>
            <StatisticLine text={"good"} value={props.good}/>
            <StatisticLine text={"neutral"} value={props.neutral}/>
            <StatisticLine text={"bad"} value={props.bad}/>
            <StatisticLine text={"all"} value={props.total}/>
            <StatisticLine text={"average"} value={props.average}/>
            <StatisticLine text={"positive"} value={props.positive}/>
            </tbody>
        </table>
    )
}

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>{text}</button>
)
const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [total, setTotal] = useState(0)
    const [average, setAverage] = useState(0)
    const [positive, setPositive] = useState(0)

    const handleGood = () => {
        const newGood = good + 1
        const newTotal = total + 1
        setGood(newGood)
        setTotal(newTotal)
        setAverage((newGood - bad) / newTotal)
        setPositive((newGood / newTotal) * 100)
    }
    const handleNeutral = () => {
        const newNeutral = neutral + 1
        const newTotal = total + 1
        setNeutral(newNeutral)
        setTotal(newTotal)
        setAverage((good - bad) / newTotal)
        setPositive((good / newTotal) * 100)
    }

    const handleBad = () => {
        const newBad = bad + 1
        const newTotal = total + 1
        setBad(newBad)
        setTotal(newTotal)
        setAverage((good - newBad) / newTotal)
        setPositive((good / newTotal) * 100)
    }


    return (
        <div>
            <h1>give feedback</h1>
            <Button handleClick={() => handleGood()} text="good"/>
            <Button handleClick={() => handleNeutral()} text="neutral"/>
            <Button handleClick={() => handleBad()} text="bad"/>
            <h1>statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive}/>
        </div>
    )
}

export default App