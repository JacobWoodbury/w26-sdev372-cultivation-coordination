import React from 'react'

export default function Seeds({changeSeed}) {
    
    return (
        <div>
            <button onClick = {() => changeSeed("Wheat")}>Wheat</button>
            <button onClick = {() => changeSeed("Corn")}>Corn</button>
            <button onClick = {() => changeSeed("Potato")}>Potato</button>
        </div>
    )
}