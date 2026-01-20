import { useState } from "react";
import Plot from "./Plot.jsx";
import PlotList from "./PlotList.jsx";
import Seeds from './Seeds.jsx'

export default function Garden() {
    const [plots, setPlots] = useState([]);
    const [currentPlot, setCurrentPlot] = useState(null);
    const [currentSeed, setCurrentSeed] = useState('Dirt')

    function selectPlot(id) {
        setCurrentPlot(id)
    }

    function createPlot(width, length, name, description) {
        const plants = [];
        for(let i = 0; i < width; i++){
            const row = [];
            for(let j = 0; j < length; j++){
                row.push("Dirt");
            }
            plants.push(row);
        }
        const plot = {
            name,
            description,
            plants
        };
        setPlots([...plots, plot]);
        setCurrentPlot(plots.length)
    }

    function submitForm(formData) {
        const name = formData.get("name")
        const description = formData.get("description")
        const length = formData.get("length")
        const width = formData.get("width")
        createPlot(width, length, name, description)
    }

    return (
        <div>
            <h2>Garden Creation</h2>
            <form action={submitForm}>
                <input id="name" name="name" type="text" placeholder="Plot Name" />
                <input id="description" name="description" type="text" placeholder="Plot Description" />
                <input id="length" name="length" type="number" placeholder="Length (ft)" />
                <input id="width" name="width" type="number" placeholder="Width (ft)" />
                <button class = "submission" type="submit">Add Plot</button>
            </form>
            <PlotList plots={plots} selectPlot={selectPlot} />

            <Seeds changeSeed={setCurrentSeed} />

            {currentPlot !== null && (
                <Plot key={currentPlot} seed={currentSeed} plants={plots[currentPlot].plants} name={plots[currentPlot].name} description={plots[currentPlot].description} />
            )}
        </div>
    )
}