import axios from "axios";
import {useEffect, useState} from "react";

const Country = ({country}) => {
    const [weather, setWeather] = useState(null);
    useEffect(()=>{
        const api_key = import.meta.env.VITE_W_API;
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${api_key}`)
            .then(res => {
                setWeather(res.data)
            })
            .catch(err => console.log(err))
    },[])
    if(weather) {
        return (
            <div>
                <h1>{country.name.common}</h1>
                <p>capital {country.capital[0]}<br/>
                    area {country.area}</p>
                <h3>languages:</h3>
                <ul>
                    {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
                </ul>
                <img src={country.flags.png} alt={country.name.common}/>
                <h2>Weather in {country.capital[0]}</h2>
                <p>temperature {Math.floor(weather.main.temp - 273)}°C</p>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather icon"/>
                <p>wind {weather.wind.speed} m/s </p>
            </div>
        )
    }
    else{
        return (
            <div>
                <h1>{country.name.common}</h1>
                <p>capital {country.capital[0]}<br/>
                    area {country.area}</p>
                <h3>languages:</h3>
                <ul>
                    {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
                </ul>
                <img src={country.flags.png} alt={country.name.common}/>
            </div>
        )
    }
}

export default Country