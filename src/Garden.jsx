import {useState} from "react";
import Plot from "./Plot";

export default function Garden() {
    const [plots, setPlots] = useState([]);

    function createPlot(width, length) {
        const plot = <Plot width={width} length={length} />
        setPlots([...plots, plot]);
    }

    function submitForm(formData) {
        const length = formData.get("length")
        const width = formData.get("width")
        createPlot(width, length)
        console.log(plots)
    }

    return (
        <div>
            <h1>Garden</h1>
            <form action={submitForm}>
                <input id="name" name="name" type="text" placeholder="Plot Name" />
                <input id="description" name="description" type="text" placeholder="Plot Description" />
                <input id="length" name="length" type="number" placeholder="Length (ft)" />
                <input id="width" name="width" type="number" placeholder="Width (ft)" />
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