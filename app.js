// const baseURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
// const container = document.querySelector('#container');


// for (let list of missing) {
//     const pokemon = document.createElement('div');
//     pokemon.classList.add('pokemon')
//     const label = document.createElement('span');
//     label.innerText = `#${list}`;
//     const newImg = document.createElement('img');
//     newImg.src = `${baseURL}${list}.png`;
//     pokemon.appendChild(newImg);
//     pokemon.appendChild(label);
//     container.appendChild(pokemon);
// }

const pokedex = document.querySelector("#pokedex");
const missingPokemon = document.querySelector("#missingCount");

const fetchPokemon = () => {

    const promises = [];
    for (let num of missing) {
        const url = `https://pokeapi.co/api/v2/pokemon/${num}`
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((data) => ({
            name: data.name,
            id: data.id,
            image: data.sprites['other']['official-artwork']['front_default'],
            type: data.types.map(type => type.type.name).join(', ')
        }));
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    const pokemonHTMLString = pokemon.map(pokeman => `
    <li class="card">
        <img class="card-image" src="${pokeman.image}"/>
        <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
        <p class="card-subtitle">Type: ${pokeman.type}</p>
    </li>
    `).join('');
    pokedex.innerHTML = pokemonHTMLString;
}

fetchPokemon()

const countMissing = function () {
    console.log(missing.length);
    missingPokemon.innerHTML = `Missing: ${missing.length}`
}

countMissing()