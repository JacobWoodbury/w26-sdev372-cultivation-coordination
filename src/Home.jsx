import { useState } from "react";
import Garden from "./Garden";
export default function Home() {
    const [plants, setPlants] = useState([]);

    const getPlants = () => {
        fetch('http://localhost:3000/api/plants')
            .then(response => response.json())
            .then(data => setPlants(data));
    };
    return (
        <div>
            <h1>Home</h1>
            <Garden />
            <button onClick={getPlants}>Request plant list</button>
            {plants.length > 0 && (
                <ul>
                    {plants.map(plant => (
                        <li key={plant.id}>Name: {plant.name} Scientific Name: {plant.scientific_name}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}