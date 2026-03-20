import Plot from "./Plot.jsx";
import Search from "./Search.jsx";

export default function Garden({ selectedPlant, onSelectPlant, plot, onPlant }) {
    return (
        <div>
            <h2>Garden Creation</h2>
            <Search selectedPlant={selectedPlant} onSelectPlant={onSelectPlant} />
            {plot && <Plot plot={plot} onPlant={onPlant} />}
        </div>
    )
}
