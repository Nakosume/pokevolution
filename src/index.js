console.log("Initializing API Fetch");

async function getPoke(id) {
    try{
        const poke = fetch('https://pokeapi.co/api/v2/pokemon-species/'+id).then(res=>res.json())
       // console.log(poke)
        return poke;
    }catch(error){
        console.error('error')
    }
}

function showAPI () {
    console.log("loading data...")
    let search = document.getElementById("search")
    let cardHolder = document.getElementById("cardHolder")

    const bar = this.document.createElement('input')
    bar.setAttribute("id","bar")
    bar.setAttribute("type","text")
    search.appendChild(bar)

    let buto = this.document.createElement('button')
    buto.innerText='search'
    buto.addEventListener("click",async()=>{
        console.log(getPoke(bar.value))
    })
    search.appendChild(buto)

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

showAPI()