const boton = document.getElementById('boton');
const listaPokemon = document.getElementById('tipo-pokemon')

//Agregar tipos de pokemones a la lista
boton.addEventListener('click', async (e) => {
    e.preventDefault();
    await fetch('https://pokeapi.co/api/v2/pokemon-form/?limit=151')
    .then( data =>  data.json() )
    .then( data =>  imprimirPokemon(data.results));
})

function imprimirPokemon(pokemon){
    //Genera ID random de pokemon
    const idPokemon = parseInt(Math.random() * 151)+1;
    //Almacena nombre en variable
    const nombrePokemon = pokemon[idPokemon-1].name;
    const div = document.getElementById('poke-tarjeta');
    if(div.value!==''){
        div.innerHTML += 
            `
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idPokemon}.png" class="foto" alt="">
            <p class="poke-number">${idPokemon}</p>
            <p class="poke-tittle">${nombrePokemon}</p>
            <p class="poke-type">Agua</p>
            `;
            const contenedorPokemon = document.getElementById('div-pokemon');
            contenedorPokemon.appendChild(div);
    }else{
        console.log('tiene algo')
    }
}