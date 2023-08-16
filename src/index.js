console.log("Initializing API Fetch");
//_______________________________________________________________________________________________________
const pokemon = {
    pokeName: "nullname",
    pokeId: "nullid",
    pokeSprite: "nullImg",
    pokeColor: "nullColor",
    pokeHeight: "nullHeight",
    prevEvo: null,
    nextEvo: null,
}
//_______________________________________________________________________________________________________
async function getPoke(id) {
    console.log("loading data...")
    try{
        const poke = await fetch('https://pokeapi.co/api/v2/pokemon-species/'+id).then(res=>res.json())
        const poke2 = await fetch('https://pokeapi.co/api/v2/pokemon/'+id).then(res=>res.json())
        const poke3 = await fetch(poke.evolution_chain.url).then(res=>res.json())

        //console.log(poke)
        //console.log(poke2)
        //console.log(poke3)

        const result = pokemon;
            result.pokeName = poke.name;
            result.pokeId = poke.id;
            result.pokeSprite = poke2.sprites.front_default
            result.pokeColor = poke.color.name
            result.pokeHeight = poke2.height
            //prev Evo
            if(poke.evolves_from_species !== null)
                result.prevEvo = poke.evolves_from_species.name
            //next Evo
            if(poke3.chain.evolves_to[0].species.name !== poke.name){
                if(poke3.chain.evolves_to[0].evolves_to[0].species.name !== poke.name){
                    result.nextEvo = poke3.chain.evolves_to[0].species.name
                }
            }
            else{
                if(poke3.chain.evolves_to[0].evolves_to[0].species.name !== poke.name){
                    result.nextEvo = poke3.chain.evolves_to[0].evolves_to[0].species.name
                }
            }

        return result
    }catch(error){
        console.error("error, couldn't fetch from API")
        alert("Couldn't fetch from API. Try checking the spelling.")
    }
}
//_______________________________________________________________________________________________________
function createCard (pokemon) {
    cardHolder.innerHTML = ``
    console.log("Create Card(), pokemon:",pokemon)
    const cardStuff = this.document.createElement('div');
    cardStuff.classList.add("cardStyle")
    let cardInfo = `
        <img src='${pokemon.pokeSprite}'>
        <h3 class="infoLabel">${(pokemon.pokeName)[0].toUpperCase() + (pokemon.pokeName).substring(1)} ID: ${pokemon.pokeId}</h3>
        <h5 class="infoLabel">Height: ${pokemon.pokeHeight} Units</h5>
        <h5 class="infoLabel">Color: ${pokemon.pokeColor}</h5>
        <button id="nextEvo">Evolve</button>
        <button id="prevEvo">Devolve</button>
        `

    console.log(cardInfo)
    cardStuff.innerHTML = cardInfo
    cardHolder.appendChild(cardStuff)

    let prevEvo = document.getElementById("prevEvo")
    let nextEvo = document.getElementById("nextEvo")

    prevEvo = this.addEventListener("click",async()=>{
        console.log("Trying Previous Evolution")
        if (pokemon.prevEvo !== null){
            let newPokemon = await getPoke(pokemon.prevEvo)
            createCard(newPokemon)
        }
        else{
            alert("The pokemon has no previous evolution")
        }
    })

    nextEvo = this.addEventListener("click",async()=>{
        console.log("Trying Next Evolution")
        if (pokemon.nextEvo !== null){
            let newPokemon = await getPoke(pokemon.nextEvo)
            createCard(newPokemon)
        }
        else{
            alert("The pokemon has no evolution")
        }
    })
}

//FIXME: error que hace que se ejecuten ambos botones a la vez
//_______________________________________________________________________________________________________
function showAPI () {
    let search = document.getElementById("search")
    let cardHolder = document.getElementById("cardHolder")

    const bar = this.document.createElement('input')
    bar.setAttribute("id","bar")
    bar.setAttribute("type","text")
    search.appendChild(bar)

    let buto = this.document.createElement('button')
    buto.innerText='search'
    buto.addEventListener("click",async()=>{
        //console.log(getPoke(bar.value))
        let pokemon = await getPoke(bar.value)
        createCard(pokemon)
    })
    search.appendChild(buto)
}
//_______________________________________________________________________________________________________
showAPI()