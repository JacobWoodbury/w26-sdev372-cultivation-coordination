import Cell from './Cell.jsx'

export default function Plot({ plot, onPlant }) {
    return (
        <div>
            <h1>{plot.name}</h1>
            <p>{plot.description}</p>
            <table>
                <tbody>
                    {plot.plants && plot.plants.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, colIndex) => (
                                <td key={colIndex}>
                                    <Cell
                                        index={{ i: rowIndex, j: colIndex }}
                                        cell={cell}
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
