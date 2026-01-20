import React from 'react'

export default function Cell({ index, plant, updatePlants, seed }) {
    
    return (
        <>
            <p>{plant}</p>
            <button onClick = {() => updatePlants(seed, index)}>Plant Here...</button>
        </>
    )
}