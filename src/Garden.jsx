
export default function Garden() {
    const [plots, setPlots] = useState([]);
    function createPlot(width, length) {
        const plot = <Plot width={width} length={length} />
        setPlots([...plots, plot]);
    }
    return (
        <div>
            <h1>Garden</h1>
            <form>
                <input type="text" placeholder="Plot Name" />
                <input type="text" placeholder="Plot Description" />
                <input type="number" placeholder="Length (ft)" />
                <input type="number" placeholder="Width (ft)" />
                <button type="submit">Add Plot</button>
            </form>
            {plots.length > 0 && (
                <ul>
                    {plots.map(plot => (
                        <li key={plot.id}>{plot.name}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}