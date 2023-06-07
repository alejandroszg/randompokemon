const boton = document.getElementById('boton');

let pokedex = [];
let pokePhoto = [];
let pokeType = [];
let _pokeColor = [];

document.addEventListener('DOMContentLoaded', () => {
    fetch('https://pokeapi.co/api/v2/pokemon-form/?limit=151')
        .then((response) => {
            if(response.ok) {
                return response.json();
            }
            throw new Error('Error en la conexión a la API');
        })
        .then((data) => {
            pokedex = data.results;
            const promises = pokedex.map((form) =>
                fetch(form.url).then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Error en la conexión a la API');
                })
            );
            return Promise.all(promises);
        })
        .then((pokemonData) => {
            const sprites = pokemonData.map((pokemon) => pokemon.sprites.front_default);
            pokePhoto = sprites;
            const tipo = pokemonData.map((pokemon) => pokemon.types[0].type.name)
            pokeType = tipo;
        })
        .catch((error) => {
            console.log(error);
        });
    fetch('https://pokeapi.co/api/v2/pokemon-species/?limit=151')
        .then((resp) => {
            if(resp.ok) {
                return  resp.json();
            }
            throw new Error('Error en la conexión a la API')
        })
        .then((info) => {
            pokeSpecies = info.results;
            const promesas = pokeSpecies.map((forms) =>
                fetch(forms.url).then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Error en la conexión a la API');
                })
            );
            return Promise.all(promesas);
        })
        .then((dataPoke) => {
            const color = dataPoke.map((pokemon) => pokemon);
            _pokeColor = color;
        })
        .catch((error) => {
            console.log(error);
        })
})

boton.addEventListener('click', (e) => {
    e.preventDefault();
    //Generate random pokemon ID
    const idPokemon = parseInt(Math.random() * 151)+1;
    imprimirPokemones(idPokemon);
})
        
function imprimirPokemones (randomPokemonId){
    const pokeNombre = pokedex[randomPokemonId].name;
    const photoPokemon = pokePhoto[randomPokemonId];
    const pokeTipo = pokeType[randomPokemonId]
    const colorPokemon = _pokeColor[randomPokemonId].color.name
    console.log(colorPokemon)

    //Color del Pokemon

    const div = document.getElementById('poke-tarjeta');
    
    //Add color to the poke-card background
    div.innerHTML = 
    `
        <img src="${photoPokemon}" class="foto" alt="">
        <p class="poke-number"><span class="fondo"><b>Id:</b> ${randomPokemonId + 1 }</span></p>
        <p class="poke-tittle titulo"><span class="fondo"><b>Pokemon:</b> ${pokeNombre}</span></p>
        <p class="poke-type titulo"><span class="fondo"><b>Type:</b> ${pokeTipo}</span></p>
    `
   switch (colorPokemon){
        case 'black':
            div.style.backgroundColor = '#262626';
            break;
        case 'blue':
            div.style.backgroundColor = '#2196F3';
            break;
        case 'brown':
            div.style.backgroundColor = '#795548';
            break;
        case 'gray':
            div.style.backgroundColor = '#B2BEC3';
            break;
        case 'green':
            div.style.backgroundColor = '#4E8644';
            break;
        case 'pink':
            div.style.backgroundColor = '#ECB0B6';
            break;
        case 'purple':
            div.style.backgroundColor = '#7E47A4';
            break;
        case 'red':
            div.style.backgroundColor = '#D52625';
            break;
        case 'white':
            div.style.backgroundColor = '#FCFCF5';
            break;
        case 'yellow':
            div.style.backgroundColor = '#FFE164';
            break;       
    }
    const contenedorPokemon = document.getElementById('div-pokemon');
    contenedorPokemon.appendChild(div);
}