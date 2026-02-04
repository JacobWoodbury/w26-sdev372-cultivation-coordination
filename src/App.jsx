import { useState } from 'react'
import './App.css'
import Home from "./Home"

function App() {
  const [plants] = useState([])
  return (
    <div>
    <Home />

      {plants.length > 0 && (
      <div className="plant-grid">
      {plants.slice(0, 25).map((plant) => (
    <div key={plant.id} className="plant-card">
      {plant.name}
    </div>
  ))}
</div>
  )}
  </div>
  )
}

export default App


