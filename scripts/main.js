const pokemonForms = [];
const pokemonSprites = [];
const pokemonTypes = [];
const pokemonSpeciesDetails = [];
const pokemonColors = {
    black: '#262626',
    blue: '#2196F3',
    brown: '#795548',
    gray: '#B2BEC3',
    green: '#4E8644',
    pink: '#ECB0B6',
    purple: '#7E47A4',
    red: '#D52625',
    white: '#FCFCF5',
    yellow: '#FFE164'
};

document.addEventListener('DOMContentLoaded', () => {
    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Error en la conexión a la API');
            }
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    };

    const fetchPokemonForms = async () => {
        try {
            const pokemonFormData = await fetchData('https://pokeapi.co/api/v2/pokemon-form/?limit=151');
            pokemonForms.push(...pokemonFormData.results);

            const pokemonDetails = await Promise.all(pokemonForms.map(async (form) => {
                const response = await fetchData(form.url);
                return response.sprites.front_default;
            }));
            pokemonSprites.push(...pokemonDetails);

            const types = await Promise.all(pokemonForms.map(async (form) => {
                const response = await fetchData(form.url);
                return response.types[0].type.name;
            }));
            pokemonTypes.push(...types);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchPokemonSpecies = async () => {
        try {
            const speciesData = await fetchData('https://pokeapi.co/api/v2/pokemon-species/?limit=151');
            const speciesDetails = await Promise.all(speciesData.results.map(async (form) => {
                const response = await fetchData(form.url);
                return response;
            }));
            pokemonSpeciesDetails.push(...speciesDetails);
        } catch (error) {
            console.log(error);
        }
    };

    fetchPokemonForms();
    fetchPokemonSpecies();
});

const printPokemon = (randomPokemonId) => {
    const pokemonName = pokemonForms[randomPokemonId].name;
    const pokemonPhoto = pokemonSprites[randomPokemonId];
    const pokemonType = pokemonTypes[randomPokemonId];
    const pokemonColor = pokemonSpeciesDetails[randomPokemonId].color.name;

    const cardDiv = document.getElementById('poke-tarjeta');
    cardDiv.innerHTML = `
        <img src="${pokemonPhoto}" class="foto" alt="">
        <p class="poke-number"><span class="fondo"><b>Id:</b> ${randomPokemonId + 1}</span></p>
        <p class="poke-tittle titulo"><span class="fondo"><b>Pokemon:</b> ${pokemonName}</span></p>
        <p class="poke-type titulo"><span class="fondo"><b>Type:</b> ${pokemonType}</span></p>
    `;

    const backgroundColor = pokemonColors[pokemonColor] || '#FFFFFF';
    cardDiv.style.backgroundColor = backgroundColor;

    const pokemonContainer = document.getElementById('div-pokemon');
    pokemonContainer.appendChild(cardDiv);
};

const button = document.getElementById('boton');
button.addEventListener('click', (e) => {
    e.preventDefault();
    const randomPokemonId = Math.floor(Math.random() * 151) + 1;
    printPokemon(randomPokemonId);
});
