import { useState } from "react";
import Garden from "./components/Garden";

export default function Home() {
    const [plants, setPlants] = useState([]);

    const getPlants = () => {
        fetch('/api/plants')
            .then(response => {
                if (!response.ok) return response.json().then(d => Promise.reject(d));
                return response.json();
            })
            .then(data => setPlants(Array.isArray(data) ? data : []))
            .catch(() => setPlants([]));
    };
    return (
        <div>
            <h1>Home</h1>
            <Garden />
            <button class = "scientific" onClick={getPlants}>Request Scientific Plant Names</button>
            {plants.length > 0 && (
                <ul>
                    {plants.map(plant => (
                        <li key={plant.id}>Name: {plant.common_name} Scientific Name: {plant.scientific_name}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}