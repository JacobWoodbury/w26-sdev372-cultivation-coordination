import React from 'react'

export default function Seeds({inputText, changeSeed}) {
    const [plantList, setPlantList] = React.useState([])

    React.useEffect(() => {
        fetch('/api/plants')
            .then(response => response.json())
            .then(data => setPlantList(Array.isArray(data) ? data : []))
            .catch(() => setPlantList([]));
    }, [])

    const filteredData = plantList.filter((el) => {
        if (inputText === '') {
            return
        }
        else {
            return el.common_name.toLowerCase().includes(inputText)
        }
    })
    
    return (
        <div class="seeds">
            {filteredData.map((plant) => {
                return <button key={plant.id} onClick={() => changeSeed(plant.common_name)}>{plant.common_name}</button>
            })}
        </div>
    )
}