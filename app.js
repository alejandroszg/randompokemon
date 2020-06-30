const boton = document.getElementById('boton');

boton.addEventListener('click', async (e) => {
    e.preventDefault();
    //Generate random pokemon ID
    const idPokemon = parseInt(Math.random() * 151)+1;
    //Call to the API
    await fetch('https://pokeapi.co/api/v2/pokemon-form/?limit=151')
    .then(data => data.json())
    .then(pokemones => {
        const listaPokemones = pokemones.results;
        imprimirPokemones(listaPokemones, idPokemon)})});
        
async function imprimirPokemones (pokemones, idPokemones){
    const nombrePokemon = pokemones[idPokemones-1].name;
    const tiposPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemones}/`);
    const jsonPokemon = await tiposPokemon.json();
    const tipoPokemon = jsonPokemon.types[0].type.name;
    
    const div = document.getElementById('poke-tarjeta');
    //Add color to the poke-card background
    const pokeColorApi = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${idPokemones}`);
    const pokeColorGroup = await pokeColorApi.json();
    const pokeColor = pokeColorGroup.color.name;
    div.style.backgroundColor = `${pokeColor}`;
    div.innerHTML = 
    `
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idPokemones}.png" class="foto" alt="">
        <p class="poke-number"><span class="fondo"><b>Id:</b> ${idPokemones}</span></p>
        <p class="poke-tittle titulo"><span class="fondo"><b>Pokemon:</b> ${nombrePokemon}</span></p>
        <p class="poke-type titulo"><span class="fondo"><b>Type:</b> ${tipoPokemon}</span></p>
    `
    const contenedorPokemon = document.getElementById('div-pokemon');
    contenedorPokemon.appendChild(div);
    
}