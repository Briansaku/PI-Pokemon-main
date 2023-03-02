const BASE_URL = 'https://pokeapi.co/api/v2/pokemon'; // la saco de la documentacion
const POKEMON_URL = BASE_URL + '/pokemons'; 
const TYPE_URL = BASE_URL + '/types';

// El base_url esta creado solamente para traer la url principal , los que requerimos dentro de las otras modularizaciones son los otros url 
// Por ejemplo paara character y episodes de los controllers , llevamos la constante que corresponde para cada uno

module.exports = {
    BASE_URL,
    POKEMON_URL,
    TYPE_URL
}