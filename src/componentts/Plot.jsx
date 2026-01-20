import { useState } from "react";
import Cell from './Cell.jsx'

export default function Plot({ seed, plants, name, description}) {
    const [plot, setPlot] = useState({name, description, plants});
    
    function updatePlants(currentSeed, index) {
        setPlot((prevPlot) => {
            const newPlot = {...prevPlot};
            newPlot.plants[index.i][index.j] = currentSeed;
            return newPlot;
        })
    }
    
    return (
        <div>
            <h1>{plot.name}</h1>
            <p>{plot.description}</p>
            <table>
                <tbody>
                    {plot.plants && plot.plants.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((plant, colIndex) => (
                                <td key={colIndex}>
                                    <Cell 
                                        index={{i: rowIndex, j: colIndex}} 
                                        plant={plant} 
                                        seed={seed} 
                                        updatePlants={updatePlants}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}