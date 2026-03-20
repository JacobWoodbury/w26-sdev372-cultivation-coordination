import React from 'react'
import { normalizeCell } from '../utils/plotCells'

export default function Cell({ index, cell, onPlant }) {
    const c = normalizeCell(cell)

    if (c.type === 'empty') {
        return (
            <>
                <p>{c.label}</p>
                <button type="button" onClick={() => onPlant(index)}>Plant Here...</button>
            </>
        )
    }

    return (
        <>
            {c.thumbnailUrl ? (
                <img
                    className="cellPlantThumb"
                    src={c.thumbnailUrl}
                    alt={c.commonName}
                    width={48}
                    height={48}
                    loading="lazy"
                />
            ) : (
                <p>{c.commonName}</p>
            )}
            <button type="button" onClick={() => onPlant(index)}>Plant Here...</button>
        </>
    )
}
