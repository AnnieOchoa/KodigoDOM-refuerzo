const buscar = async () => {
    try {
        let valor = document.getElementById("nombrePokemon").value
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${valor}`)
        const data = await response.json()
        //console.log(data)
        document.querySelector("#pokemon").innerHTML = `
                            <div class="card" style="width: 18rem;">
                                <img src="..." class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">Card title</h5>
                                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                                        card's content.</p>
                                    <a href="#" class="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>`;
    } catch (error) {
        document.querySelector("#pokemon").innerHTML = `error no se encontro el pokemon`;
        //console.log(error);
    }
}