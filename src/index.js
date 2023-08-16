console.log("Initializing API Fetch");

//_______________________________________________________________________________________________________

const pokemonObj = {
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

        const result = pokemonObj;
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
    cardHolder.innerHTML = null
    console.log("Create Card(), pokemon:",pokemon)
    const cardStuff = this.document.createElement('div');
    cardStuff.classList.add("cardStyle")

    let pImg = document.createElement('img')
    pImg.src = pokemon.pokeSprite

    let pNameId = document.createElement('h3')
    pNameId.classList.add("infoLabel")
    pNameId.innerText = `${(pokemon.pokeName)[0].toUpperCase() + (pokemon.pokeName).substring(1)} ID: ${pokemon.pokeId}`

    let pHeight = document.createElement('h5')
    pHeight.classList.add("infoLabel")
    pHeight.innerText = `Height: ${pokemon.pokeHeight} Units`

    let pColor = document.createElement('h5')
    pColor.classList.add("infoLabel")
    pColor.innerText = `Color: ${pokemon.pokeColor}`

    let pEvo = document.createElement('button')
    pEvo.innerText = "Evolve"
    pEvo.addEventListener("click",async()=>{
        console.log("Trying Next Evolution")
        pokemon = await getPoke(pokemon.nextEvo)
        console.log("newPoke:", pokemon)

        pImg.src = pokemon.pokeSprite
        pNameId.innerText = `${(pokemon.pokeName)[0].toUpperCase() + (pokemon.pokeName).substring(1)} ID: ${pokemon.pokeId}`
        pHeight.innerText = `Height: ${pokemon.pokeHeight} Units`
        pColor.innerText = `Color: ${pokemon.pokeColor}`
    })

    let pDevo = document.createElement('button')
    pDevo.innerText = "Devolve"
    pDevo.addEventListener("click",async()=>{
        console.log("Trying Previous Evolution")
        pokemon = await getPoke(pokemon.prevEvo)
        console.log("newPoke:", pokemon)

        pImg.src = pokemon.pokeSprite
        pNameId.innerText = `${(pokemon.pokeName)[0].toUpperCase() + (pokemon.pokeName).substring(1)} ID: ${pokemon.pokeId}`
        pHeight.innerText = `Height: ${pokemon.pokeHeight} Units`
        pColor.innerText = `Color: ${pokemon.pokeColor}`
    })

    cardStuff.appendChild(pImg)
    cardStuff.appendChild(pNameId)
    cardStuff.appendChild(pHeight)
    cardStuff.appendChild(pColor)
    cardStuff.appendChild(pEvo)
    cardStuff.appendChild(pDevo)

    cardHolder.appendChild(cardStuff)
}

//_______________________________________________________________________________________________________

function showAPI () {
    let search = document.getElementById("search")
    //let cardHolder = document.getElementById("cardHolder")

    const bar = this.document.createElement('input')
    bar.setAttribute("id","bar")
    bar.setAttribute("type","text")
    bar.placeholder = "Search Pokemon"
    search.appendChild(bar)

    let buto = this.document.createElement('button')
    buto.classList.add("searchButton")
    buto.innerText='Search'
    buto.addEventListener("click",async()=>{
        //console.log(getPoke(bar.value))
        let pokemon = await getPoke(bar.value)
        createCard(pokemon)
    })
    search.appendChild(buto)
}

//_______________________________________________________________________________________________________

showAPI()