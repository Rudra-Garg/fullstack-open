import {useState} from 'react'

const Anecdote = ({anecdote, votes}) => {
    return (
        <div>
            {anecdote} <br/>
            has {votes} votes
        </div>
    )
}
const Button = ({text, onClick}) => {
    return (
        <button onClick={onClick}>{text}</button>
    )
}
const DailyAnecdote = ({anecdote, votes, onVote, onNext}) => {
    return (
        <>
            <h1>Anecdote of the day</h1>
            <Anecdote anecdote={anecdote} votes={votes}/>
            <Button text="vote" onClick={onVote}/>
            <Button text="next anecdote" onClick={onNext}/>
        </>
    )
}

const MostVoted = ({anecdotes, votes}) => {
    const max = Math.max(...votes)
    const index = votes.indexOf(max)
    return (
        <>
            <h1>Anecdote with most votes</h1>
            <Anecdote anecdote={anecdotes[index]} votes={votes[index]}/>
        </>
    )
}


const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]

    const onVote = () => {
        const copy = [...votes]
        copy[selected] += 1
        return setVotes(copy)
    }
    const onNext = () => {
        const n = Math.floor(Math.random() * anecdotes.length)
        return setSelected(n)
    }
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
    return (
        <div>
            <DailyAnecdote anecdote={anecdotes[selected]} votes={votes[selected]} onVote={onVote} onNext={onNext}/>
            <MostVoted anecdotes={anecdotes} votes={votes}/>
        </div>
    )
}

export default App