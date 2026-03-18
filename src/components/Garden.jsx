import Plot from "./Plot.jsx";
import Search from './Search.jsx'

export default function Garden({ currentSeed, onChangeSeed, plot, onPlant }) {
    return (
        <div>
            <h2>Garden Creation</h2>
            <Search onChangeSeed={onChangeSeed} />
            {plot && <Plot seed={currentSeed} plot={plot} onPlant={onPlant} />}
        </div>
    )
}