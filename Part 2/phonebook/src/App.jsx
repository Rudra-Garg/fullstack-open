import {useEffect, useState} from 'react'
import phonebookService from './services/phonebook.js'
import Persons from './components/Persons.jsx'
import Filter from './components/Filter.jsx'
import Notification from './components/Notification.jsx'
import './index.css'
import PersonForm from './components/PersonForm.jsx'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    useEffect(() => {
        phonebookService.getAll()
            .then(response => setPersons(response))
    }, []);

    const addPerson = (event) => {
        event.preventDefault()
        const newObject = {
            name: newName.trim(), number: newNumber.trim()
        }
        const isPresent = persons.find(person => person.name === newObject.name)
        if (isPresent) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old phone number with a new one?`)) {
                phonebookService.update(isPresent.id, newObject)
                    .then(response => {
                        setSuccessMessage(`Updated ${newObject.name}`)
                        setTimeout(() => setSuccessMessage(null), 2000)
                        setPersons(persons.filter(person => (person.id !== isPresent.id) ? person : person.number = newNumber))
                        setNewName('')
                        setNewNumber('')

                    })
                    .catch(error => {
                        setErrorMessage(error.response.data.error)
                        setTimeout(() => setErrorMessage(null), 5000)
                    })
            }
        } else {
            phonebookService.create(newObject)
                .then(response => {
                    setSuccessMessage(`Added ${newObject.name}`)
                    setTimeout(() => setSuccessMessage(null), 2000)
                    setPersons(persons.concat(response))
                    setNewName('')
                    setNewNumber('')
                })
                .catch(error => {
                    setErrorMessage(error.response.data.error)
                    setTimeout(() => setErrorMessage(null), 5000)
                })
        }

    }
    const onDelete = (person) => {
        if (window.confirm(`Delete ${person.name}?`)) {
            phonebookService.deletePerson(person.id)
                .then(() => setPersons(persons.filter(p => p.id !== person.id)))
                .catch(error => {
                    setErrorMessage(`Information of ${person.name} is already removed from the server`)
                    setPersons(persons.filter(p => p.id !== person.id))
                    setTimeout(() => setErrorMessage(null), 5000)
                })
        }
    }
    const handleNewName = (event) => setNewName(event.target.value)
    const handleFilter = (event) => setFilter(event.target.value)
    const handleNewNumber = (event) => setNewNumber(event.target.value)
    return (<div>
        <h2>Phonebook</h2>
        <Notification message={successMessage} type={'success'}/>
        <Notification message={errorMessage} type={'error'}/>
        <Filter handleFilter={handleFilter} filter={filter}/>
        <h2>add a new</h2>
        <PersonForm addPerson={addPerson} newName={newName} handleNewName={handleNewName} newNumber={newNumber}
                    handleNewNumber={handleNewNumber}/>
        <h2>Numbers</h2>
        <Persons persons={persons} filter={filter} onDelete={onDelete}/>
    </div>)
}

export default App