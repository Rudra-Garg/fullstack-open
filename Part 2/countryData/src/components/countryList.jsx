import React from 'react'
import Country from './Country'

const CountryList = ({country, setCountry}) => {

    if (country.length === 0) {
        return (
            <div>
                No countries found
            </div>
        )
    } else if (country.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if ((country.length > 1 && country.length < 10)) {
        return (
            <div>
                {country.map((country, i) =>
                    <li key={i}> {country.name.common}
                        <button onClick={() => setCountry([country])}>show</button>
                    </li>
                )}
            </div>
        )
    } else {
        return (
            <Country country={country[0]}/>
        )
    }
}

export default CountryList