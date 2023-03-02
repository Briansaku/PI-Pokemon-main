import { actionTypes } from '../actions';
import * as helpers from './helpers';


const initialState = {
    pokemons : [],
    allPokemons: [],
    detail: [], 
    types: [],
    filtered: [],
    spinnerLoader: true,
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
      case actionTypes.GET_POKEMONS:{
        return{
          ...state,
          allPokemons: action.payload,
          pokemons: action.payload,
          filtered: action.payload,
          spinnerLoader: false,
        };
      }
      case actionTypes.GET_TYPES:{
        return{
            ...state,
            types: action.payload,
        }
      }
      case actionTypes.GET_DETAILS:{
        return{
            ...state,
            detail: action.payload,
            spinnerLoader: false,
        }
      }
      case actionTypes.SEARCH_POKEMONS:{
        return{
            ...state,
            pokemons: action.payload,
            spinnerLoader: false,
        }
      }
      case actionTypes.FILTER_BY_TYPE:{
        const type = action.payload; 

        const pokemonsFiltered = type === 'default' 
          ? state.allPokemons // Si el tipo de filtro es "default", se asigna la lista de todos los pokémones a `pokemonsFiltered`.
          : state.allPokemons?.filter((pokemon) => pokemon.types.includes(type)); // Si no es "default", se filtran los pokémones según el tipo de filtro.
      
        return {
          ...state,
          pokemons: pokemonsFiltered, 
          filtered: pokemonsFiltered, 
        };
      }
      case actionTypes.RELOAD_POKEMONS:{
          const apiPokes = state.allPokemons.filter(el => !el.createdInDb);
          const dbPokes = state.allPokemons.filter(el => el.createdInDb);
          const apiPokesSorted = helpers.sortById(apiPokes, 'id');
          const dbPokesSorted = helpers.sortById(dbPokes, 'id');
          const sortedArrayNormal = [...apiPokesSorted, ...dbPokesSorted];
        return {
           ...state,
           pokemons: sortedArrayNormal,
        };
      }
      case actionTypes.POST_POKEMONS:{
        return{
            ...state,
        }
      }
      case actionTypes.REMOVE_DETAILS:{
        return{
            ...state,
            detail: [], 
        }
      }
      case actionTypes.FILTER_CREATED:{
        if (action.payload === 'created') {
          const createdPokemons = helpers.filterByCreateInDb(state.filtered, true);
          return { ...state, pokemons: createdPokemons };
        }
      
        if (action.payload === 'api') {
          const apiPokemons = helpers.filterByCreateInDb(state.filtered, false);
          return { ...state, pokemons: apiPokemons };
        }
      
        return { 
            ...state, 
            pokemons: state.filtered 
        };
      }
      case actionTypes.ORDER_BY_NAME_OR_STRENGHT:{
          let sortedArray;
        if (action.payload === 'asc' || action.payload === 'des') {
          sortedArray = helpers.sortByAttribute(state.pokemons, 'name', action.payload);
        } else if (action.payload === 'HAttack' || action.payload === 'LAttack') {
          sortedArray = helpers.sortByAttribute(state.pokemons, 'attack', action.payload === 'HAttack' ? 'desc' : 'asc');
        } else if (action.payload === 'normal') {
          const apiPokes = state.pokemons.filter((el) => !el.createdInDb);
          const dbPokes = state.pokemons.filter((el) => el.createdInDb);
          sortedArray = [...helpers.sortByAttribute(apiPokes, 'id', 'asc'), ...helpers.sortByAttribute(dbPokes, 'id', 'asc')];
        }
        return {
          ...state,
          pokemons: sortedArray,
        }
      }
      case actionTypes.ORDER_POKEMONS_ALPHABETICALLY:{
          const sortedPokemons = helpers.sortPokemonsAlphabetically(state.filtered, action.payload);
        return {
          ...state,
          pokemons: sortedPokemons,
        }
      }
      case actionTypes.DELETE_POKEMONS:{
        return{
          ...state,
        };
    } 
    default: 
            return state    
  }
}

export default rootReducer;
