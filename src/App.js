import { useContext } from 'react'
import WeatherProvider, {
  WeatherContext,
} from './WeatherProvider/WeatherProvider'
import WeatherApp from './WeatherApp'

function App() {
  return (
    <WeatherProvider>
      <WeatherApp />
    </WeatherProvider>
  )
}

export default App
