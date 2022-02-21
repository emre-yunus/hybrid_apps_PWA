console.log("run index.js");


const POKEMON_DATA = [
    {id: 113, name: "chansey", type: "normal"},
    {id: 202, name: "wobbuffet", type: "psychic"},
    {id: 289, name: "slaking", type: "normal"},
    {id: 376, name: "metagross", type: "steel/psychic"},
    {id: 862, name: "obstagoon", type: "dark/normal"}];

const alertElem = document.getElementById("alert_div");
const imgElem = document.getElementById("pokemon_img");
const pokemonIdElem = document.getElementById("pokemon_id");
const pokemonNameElem = document.getElementById("pokemon_name");
const typeElem = document.getElementById("pokemon_type");


let currentPokemonIndex = -1;
showNextPokemon();

function showNextPokemon() {
    currentPokemonIndex = currentPokemonIndex < POKEMON_DATA.length - 1 ? currentPokemonIndex + 1 : 0;
    const pokemonToShow = POKEMON_DATA[currentPokemonIndex];
    imgElem.src = `images/${pokemonToShow.id}.png`;
    pokemonIdElem.innerText = pokemonToShow.id;
    pokemonNameElem.innerText = pokemonToShow.name;
    typeElem.innerText = pokemonToShow.type;
}

async function deleteOldCaches() {
    const keyList = await caches.keys();
    const arrayOfPromises = keyList.map(key => {
        console.log(key.toString() + " cache has been deleted.");
        return caches.delete(key); //returns a Promise
    });
    await Promise.all(arrayOfPromises);
}

// Register service worker to control making site work offline
async function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        console.log("start registering Service Worker");
        const serviceWorkerRegistration = await navigator.serviceWorker.register('service_worker.js');
        console.log('registration Service Worker done');
        serviceWorkerRegistration.active?.postMessage({command: "REQUEST_VERSION"});
        //console.log(serviceWorkerRegistration);
    } else {
        console.log("geen Service Worker mogelijk in deze browser");
    }
}
registerServiceWorker();

