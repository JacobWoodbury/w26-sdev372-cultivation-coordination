import React from 'react'

export default function Seeds({inputText, changeSeed}) {
    const [plantList, setPlantList] = React.useState([])

    React.useEffect(() => {
        fetch('/api/plants')
            .then(response => response.json())
            .then(data => setPlantList(Array.isArray(data) ? data : []))
            .catch(() => setPlantList([]));
    }, [])

    console.log(plantList)

    const filteredData = plantList.filter((el) => {
        console.log(el)
        if (inputText === '') {
            return el.common_name;
        }
        else {
            return el.common_name.toLowerCase().includes(inputText)
        }
    })

    console.log(filteredData)
    
    return (
        <div class="seeds">
            {filteredData.map((plant) => {
                return <button key={plant.id} onClick={() => changeSeed(plant.common_name)}>{plant.common_name}</button>
            })}
        </div>
    )
}