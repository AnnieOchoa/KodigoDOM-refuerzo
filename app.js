
const search = async () => {
    //Clean previous result
    let refresh = document.getElementById('pokemon-container-card-id')
    if (refresh) {
        refresh.remove()
    }

    //Get input
    let poke = document.getElementById('input-search').value.toLowerCase()

    //Just if...
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`)
        const data = await response.json()
        
        const responeVersion = await fetch(`https://pokeapi.co/api/v2/pokemon-form/${data.name}`)
        const dataVersion = await responeVersion.json()

        let type = data.types[0].type.name;
        let typeSecond = data.types.length > 1 ? data.types[1].type.name : ""
        let parent = document.getElementById('pokemon-container-id')
        let pokeContainer = document.createElement("div")
        pokeContainer.id = "pokemon-container-card-id"
        pokeContainer.classList.add("row", "justify-content-center", "mt-4")
        pokeContainer.innerHTML = `
        <div class="card text-start" style="background-color:lightgrey; width: 18rem; border:1px solid ${pokeTypeColor(type)};">
            <img src=${data.sprites.front_default} class="card-img-top rounded-3 mt-3 card-img-background" alt="...">
            <div class="card-body">
                <h5 class="card-title" style="color:${pokeTypeColor(type)};">${firstUpper(data.name)}</h5>
                <p class="card-text">Es un pokemon de tipo <span class="fw-bold rounded-2">${type}</span>, ${secondType(data)} su primera aparición fue en Pokemon ${appearance(dataVersion)}</p>
            </div>
            <ul class="list-group list-group-flush mb-3 ul-font-size">
                <li class="list-group-item bg-transparent"><span class="stat-label">HP:</span> ${data.stats[0].base_stat}</li>
                <li class="list-group-item bg-transparent"><span class="stat-label">Ataque:</span> ${data.stats[1].base_stat}</li>
                <li class="list-group-item bg-transparent"><span class="stat-label">Defensa:</span> ${data.stats[2].base_stat}</li>
                <li class="list-group-item bg-transparent"><span class="stat-label">Atq. Especial:</span> ${data.stats[3].base_stat}</li>
                <li class="list-group-item bg-transparent"><span class="stat-label">Def. Especial:</span> ${data.stats[4].base_stat}</li>
                <li class="list-group-item bg-transparent"><span class="stat-label">Velocidad:</span> ${data.stats[5].base_stat}</li>
            </ul>
        </div>
        `
        parent.appendChild(pokeContainer)
    } catch (error) {
        //Error handler
        errorAPI(error);
        console.log(error);
    }

}

const cleaner = (id) => {
    let refresh = document.getElementById(id)
    if (refresh) {
        return refresh.remove()
    }
}

const cleanerError = () => {
    let error = document.getElementById('pokemon-container-error-id')
    if (error) {
        error.remove()
    }
}

const firstUpper = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

const errorAPI = (error) => {
    let parent = document.getElementById('pokemon-container-id')
    let errorMessage = document.createElement("div")
    errorMessage.id = "pokemon-container-error-id"
    errorMessage.classList.add("row", "justify-content-center")
    errorMessage.innerHTML = `
    <div class="col">
        <p class="text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3">
            El pokemn solicitado no existe
        </p>
    </div>
    `
    parent.appendChild(errorMessage)
}

const secondType = (data) => {
    let secondType;
    if (data.types.length > 1) {
        return secondType = `y <span class="fw-bold">${data.types[1].type.name},</span>`
    }
    return ""
}

const appearance = (dataVersion) => {
    let rawVersion = dataVersion.version_group.name
    let division = rawVersion.indexOf("-")
    let formatedVersion = firstUpper(rawVersion.slice(0,division)) + "/" + firstUpper(rawVersion.slice(division+1))
    console.log(formatedVersion);
    return formatedVersion
}

const pokeTypeColor = (pokemonType) => {
    let color = "";
    switch (pokemonType) {
        case "normal":
            color = "grey"
            break;
        case "fire":
            color = "red"
            break;
        case "water":
            color = "blue"
            break;
        case "electric":
            color = "yellow"
            break;
        case "grass":
            color = "darkgreen"
            break;
        case "ice":
            color = "aqua"
            break;
        case "fighting":
            color = "orange"
            break;
        case "poison":
            color = "purple"
            break;
        case "ground":
            color = "burlywood"
            break;
        case "flying":
            color = "lightgrey"
            break;
        case "psychic":
            color = "fuchsia"
            break;
        case "bug":
            color = "green"
            break;
        case "rock":
            color = "brown"
            break;
        case "ghost":
            color = "steelblue"
            break;
        case "dragon":
            color = "skyblue"
            break;
        case "dark":
            color = "black"
            break;
        case "steel":
            color="lawngreen"
            break;
        case "fairy":
            color="hotpink"
            break;
        default:
        // code block
    }
    return color;
}