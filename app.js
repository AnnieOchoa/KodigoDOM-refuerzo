const buscar = async() => {
    let valor = document.getElementById("nombrePokemon").value 

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${valor}`) 
        const data = await response.json() 
        console.log(data)
        data.results.map(() => {
            console.log(character.name)
        })
}