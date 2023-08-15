console.log("Initializing API Fetch");

const pokemon = {
    pokeName: "nullname",
    pokeId: "nullid",
    pokeSprite: "nullImg",
    pokeColor: "nullColor",
    pokeHeight: "nullHeight",
    prevEvo: "nullPrev",
    nextEvo: "nullNext",
}

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

function createCard (pokemon) {
    console.log("Create Card(), pokemon:",pokemon)
    /* let cardInfo = "";
    APIData.results.forEach(e => {
        const cardStuff = this.document.createElement('h3');
        cardStuff.classList.add("cardStyle")
        cardInfo = `Name: ${e.name} Height: ${e.height}cm Weight: ${e.mass}Kg`
        const cardButton = this.document.createElement('button');
        cardButton.classList.add("buttonStyle")
        cardButton.innerText='Add';
        console.log(cardInfo)
        cardStuff.append(cardInfo)
        cardStuff.append(cardButton)
        cardHolder.appendChild(cardStuff)
    }); */
}

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

showAPI()