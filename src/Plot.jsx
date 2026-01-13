import { useState } from "react";

export default function Plot({ width, length }) {
    const [plot, setPlot] = useState([]);

    for (let i = 0; i < width; i++) {
        const row = [];
        for (let j = 0; j < length; j++) {
            row.push("dirt");
        }
        setPlot([...plot, row]);
    }
    console.log(plot);
    return (
        <div>
            <h1>Plot</h1>
            <table>

            </table>

        </div>
    )
}