const boton = document.getElementById('boton');

boton.addEventListener('click', async (e) => {
    e.preventDefault();
    //Generate random pokemon ID
    const idPokemon = parseInt(Math.random() * 151)+1;
    //Call to the API
    const consulta = await fetch('https://pokeapi.co/api/v2/pokemon-form/?limit=151');
    const pokemones = await consulta.json();
    const mostrar = pokemones.results;
    imprimirPokemones(mostrar, idPokemon);
})
        
async function imprimirPokemones (pokemones, idPokemones){
    //Nombre del Pokemon
    const nombrePokemon = pokemones[idPokemones-1].name;
    //Tipo del Pokemon
    const tiposPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemones}/`);
    const jsonPokemon = await tiposPokemon.json();
    //Foto del Pokemon
    const consultaFoto = await fetch(`https://pokeapi.co/api/v2/pokemon-form/${idPokemones}/`);
    const grupoFoto = await consultaFoto.json();
    //Color del Pokemon
    const pokeColorApi = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${idPokemones}`);
    const pokeColorGroup = await pokeColorApi.json();
    const pokeColor = pokeColorGroup.color.name;
    const div = document.getElementById('poke-tarjeta');
    
    const pokeFoto = grupoFoto.sprites.front_default;
    const tipoPokemon = jsonPokemon.types[0].type.name;
    
    //Add color to the poke-card background
    div.innerHTML = 
    `
        <img src="${pokeFoto}" class="foto" alt="">
        <p class="poke-number"><span class="fondo"><b>Id:</b> ${idPokemones}</span></p>
        <p class="poke-tittle titulo"><span class="fondo"><b>Pokemon:</b> ${nombrePokemon}</span></p>
        <p class="poke-type titulo"><span class="fondo"><b>Type:</b> ${tipoPokemon}</span></p>
    `
    switch (pokeColor){
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