import Cell from './Cell.jsx'

export default function Plot({ seed, plot, onPlant }) {
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
                                        onPlant={onPlant}
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