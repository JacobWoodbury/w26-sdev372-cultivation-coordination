import React from 'react'

export default function Seeds({changeSeed}) {
    const [plantList, setPlantList] = React.useState([])

    React.useEffect(() => {
        fetch("http://143.198.101.13:3000/api/plants")
            .then(response => response.json())
            .then(data => setPlantList(data));
    }, [])
    
    return (
        <div class="seeds">
            {plantList.map((plant) => {
                return <button key={plant.id} onClick={() => changeSeed(plant.common_name)}>{plant.common_name}</button>
            })}
        </div>
    )
}