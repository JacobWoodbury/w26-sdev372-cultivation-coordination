import React from 'react'
import { fetchPlantDetailsById } from '../api/plants'
import { apiUrl } from '../api/api'

export default function Seeds({ inputText, onSelectPlant }) {
    const [plantList, setPlantList] = React.useState([])

    React.useEffect(() => {
        fetch(apiUrl('/api/plants'))
            .then(response => response.json())
            .then(data => setPlantList(Array.isArray(data) ? data : []))
            .catch(() => setPlantList([]));
    }, [])

    const filteredData = plantList.filter((el) => {
        if (inputText === '') {
            return false
        }
        return el.common_name.toLowerCase().includes(inputText)
    })

    async function handlePick(plant) {
        try {
            const d = await fetchPlantDetailsById(plant.id)
            onSelectPlant({
                id: d.id,
                common_name: d.common_name,
                thumbnailUrl: d.thumbnailUrl ?? null,
            })
        } catch {
            onSelectPlant({
                id: plant.id,
                common_name: plant.common_name,
                thumbnailUrl: null,
            })
        }
    }

    return (
        <div className="seeds">
            {filteredData.map((plant) => {
                return (
                  <button
                    key={plant.id}
                    type="button"
                    onClick={() => handlePick(plant)}
                  >
                    {plant.common_name}
                  </button>
                );
            })}
        </div>
    )
}
