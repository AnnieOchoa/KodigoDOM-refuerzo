//Async function that retrieves data from PokeAPI
const search = async () => {
    
    //Clean previous result (if any)
    let refresh = document.getElementById('pokemon-container-card-id')
    if (refresh) {
        refresh.remove()
    }

    //Get input data
    let poke = document.getElementById('input-search').value.toLowerCase().trim()

    //Tries
    try {
        //Consume our first endpoint (most of the data)
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`)
        const data = await response.json()
        
        //The second endpoint (only gets the game version of that pokemon)
        const responeVersion = await fetch(`https://pokeapi.co/api/v2/pokemon-form/${data.name}`)
        const dataVersion = await responeVersion.json()

        //Storage the main type
        let type = data.types[0].type.name;

        //Parent container
        let parent = document.getElementById('pokemon-container-id')

        //Draw a new HTML element (the pokemon card)
        let pokeContainer = document.createElement("div")
        pokeContainer.id = "pokemon-container-card-id"
        pokeContainer.classList.add("row", "justify-content-center", "mt-4")
        pokeContainer.innerHTML = `
        <div class="card text-start" style="background-color:lightgrey; width: 18rem; border:1px solid ${pokeTypeColor(type)};">
            <img src=${data.sprites.front_default} class="card-img-top rounded-3 mt-3 card-img-background" alt="...">
            <div class="card-body">
                <h5 class="card-title" style="color:${pokeTypeColor(type)};">${firstUpper(data.name)} &emsp; <span class="text-black id-label">ID: ${data.id}</span></h5>
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
        window.location.replace("#pokemon-container-id");
    } catch (error) {
        //Error handler
        errorAPI();
        console.log(error);
    }

}

//On Enter, triggers the same function as the button
document.getElementById('input-search').addEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
      search()
    }
  });

//Clean a previous Element (Cards and Errors)
const cleaner = (id) => {
    let refresh = document.getElementById(id)
    if (refresh) {
        return refresh.remove()
    }
}

//Clean an error when the user types inside of the input
const cleanerError = () => {
    let error = document.getElementById('pokemon-container-error-id')
    if (error) {
        error.remove()
    }
}

//Convert the first letter of a string into an uppercase
const firstUpper = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

//Draw an error on the window
const errorAPI = () => {
    //First delete the current error (if any)
    cleaner("pokemon-container-error-id")
    let parent = document.getElementById('pokemon-container-id')
    let errorMessage = document.createElement("div")
    errorMessage.id = "pokemon-container-error-id"
    errorMessage.classList.add("row", "justify-content-center")
    errorMessage.innerHTML = `
    <div class="col-auto">
        <p class="text-danger-emphasis my-3 p-3 bg-danger-subtle border border-danger-subtle rounded-3">
            El pokemon solicitado no existe
        </p>
    </div>
    `
    parent.appendChild(errorMessage)
}

//Get the second type (if any)
const secondType = (data) => {
    let secondType;
    if (data.types.length > 1) {
        return secondType = `y <span class="fw-bold">${data.types[1].type.name},</span>`
    }
    return ""
}

//Retrive the first game appearance of a pokemon
const appearance = (dataVersion) => {
    let rawVersion = dataVersion.version_group.name
    let division = rawVersion.indexOf("-")
    let formatedVersion = firstUpper(rawVersion.slice(0,division)) + "/" + firstUpper(rawVersion.slice(division+1))
    console.log(formatedVersion);
    return formatedVersion
}

//Get the color type of a pokemon (the main type only)
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
            color = "goldenrod"
            break;
        case "grass":
            color = "darkgreen"
            break;
        case "ice":
            color = "dodgerblue"
            break;
        case "fighting":
            color = "sienna"
            break;
        case "poison":
            color = "purple"
            break;
        case "ground":
            color = "saddlebrown"
            break;
        case "flying":
            color = "grey"
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
            color = "darkslategrey"
            break;
        case "dark":
            color = "darkslateblue"
            break;
        case "steel":
            color="slategray"
            break;
        case "fairy":
            color="hotpink"
            break;
        default:
        // code block
    }
    return color;
}

//Footer functionality
const cards = document.querySelectorAll('.main-footer__content--card')

//Get data from that specified pokemon that has been clicked
cards.forEach( card => {
    card.addEventListener('click', ({target:{parentElement}}) => {
        document.querySelector('#input-search')
            .value = parentElement.id
        search()
    })
})

