import {useEffect, useState} from 'react'
import services from './services/countryData.js'
import CountryList from "./components/countryList.jsx";




const App = () => {

    const [filter, setFilter] = useState('')
    const [countries, setCountries] = useState([])
    const [country, setCountry] = useState([])
    useEffect(() => {
        services.getAll()
            .then(response => {
                setCountries(response)
                setCountry(response)
            })
    }, [])
    if (countries.length === 0) {
        return <div>loading...</div>
    }

    const handleFilter = (event) => {
        setFilter(event.target.value)
        const f = event.target.value.toLowerCase()
        if (f) {
            const filtered = countries.filter(country => country.name.common.toLowerCase().includes(f))
            setCountry(filtered)
        } else {
            setCountry(countries)
        }
    }
    return (
        <div>
            find countries <input value={filter} onChange={handleFilter}/>
            <CountryList country={country} setCountry={setCountry}/>
        </div>
    )
}

export default App
