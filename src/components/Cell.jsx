import React from 'react'

export default function Cell({ index, plant, onPlant, seed }) {
    
    return (
        <>
            <p>{plant}</p>
            <button onClick = {() => onPlant(seed, index)}>Plant Here...</button>
        </>
    )
}