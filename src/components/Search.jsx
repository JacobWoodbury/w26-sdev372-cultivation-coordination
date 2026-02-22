import { useState } from 'react';
import TextField from "@mui/material/TextField"
import Seeds from './Seeds.jsx'

export default function Search({changeSeed}) {
    const [inputText, setInputText] = useState("");
    
    function inputHandler(e) {
        const lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase)
    }

    return (
        <>
            <h1>React Search</h1>
            <div className="search">
                <TextField 
                id="outlined-basic"
                onChange={inputHandler}
                variant="outlined"
                fullWidth
                label="Search"
                />
            </div>
            <Seeds inputText={inputText} changeSeed={changeSeed} />
        </>
    )
}
//Search database for plants that match the search query
//if no plants are found call Api search function to get plants from Perenual API
//we get info that matches (if from api add to db) and then display the plants in the search results
