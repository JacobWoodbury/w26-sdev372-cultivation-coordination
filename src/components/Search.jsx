import { useState } from 'react';
import TextField from "@mui/material/TextField"
import Seeds from './Seeds.jsx'

export default function Search({ selectedPlant, onSelectPlant }) {
    const [inputText, setInputText] = useState("");

    function inputHandler(e) {
        const lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase)
    }

    return (
        <>
            <h2>Search Plants</h2>
            <p className="brushHint">
                Brush: {selectedPlant ? selectedPlant.common_name : 'Dirt (empty cell)'}
            </p>
            <button type="button" className="dirtBrush" onClick={() => onSelectPlant(null)}>
                Use dirt
            </button>
            <div className="search">
                <TextField
                    id="outlined-basic"
                    onChange={inputHandler}
                    variant="outlined"
                    fullWidth
                    label="Search"
                />
            </div>
            <Seeds inputText={inputText} onSelectPlant={onSelectPlant} />
        </>
    )
}
