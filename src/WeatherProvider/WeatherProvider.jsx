import React, { createContext, useEffect, useState } from 'react'

export const WeatherContext = createContext({})

export default function WeatherProvider({ children }) {
  const [weatherInfo, setWeatherInfo] = useState({})

  const getWeatherInfo = async () => {
    try {
      const currentWeatherInfoAPI =
        'https://api.openweathermap.org/data/2.5/weather?appid=d3c45c146c5902be712d8ae3b0bcb0b4&q=seoul&units=metric'
      const currentWeatherInfo = await fetch(currentWeatherInfoAPI)
      const {
        name,
        coord: { lat, lon },
        main: { temp, humidity, feels_like, temp_min, temp_max },
        sys: { sunset, sunrise },
        weather: [{ main: weatherState }],
        wind: { speed, deg },
      } = await currentWeatherInfo.json()
      const hourlyWeatherInfoAPI = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily&appid=d3c45c146c5902be712d8ae3b0bcb0b4&units=metric`
      const hourlyWeatherInfo = await fetch(hourlyWeatherInfoAPI)
      const { hourly } = await hourlyWeatherInfo.json()
      setWeatherInfo({
        name,
        temp,
        humidity,

        weatherState,
        feels_like,
        speed,
        deg,
        hourly,
        sunset,
        sunrise,
        temp_min,
        temp_max,
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getWeatherInfo()
  }, [])

  return (
    <WeatherContext.Provider value={{ ...weatherInfo }}>
      {children}
    </WeatherContext.Provider>
  )
}
