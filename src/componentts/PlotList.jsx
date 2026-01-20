import { useState } from "react";
export default function PlotList({ plots, selectPlot }) {
    const [openList, setOpenList] = useState(null);
    function handleOpenList() {
        setOpenList(!openList);
    }
    return (
        <div class="plotList">
            <button onClick={handleOpenList}>My Plots</button>
            {openList && plots.map((plot, id) => (
                <button class = "list" onClick={() => selectPlot(id)} key={id}>{plot.name}</button>
            ))}
        </div>
    )
}