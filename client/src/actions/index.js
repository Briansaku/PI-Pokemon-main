import axios from 'axios';

//Action types

export const actionTypes = {
    GET_POKEMONS: 'GET_POKEMONS', 
    GET_TYPES: 'GET_TYPES',
    GET_DETAILS: 'GET_DETAILS',
    SEARCH_POKEMONS: 'SEARCH_POKEMONS',
    FILTER_BY_TYPE: 'FILTER_BY_TYPE',
    RELOAD_POKEMONS: 'RELOAD_POKEMONS',
    POST_POKEMONS: 'POST_POKEMONS',
    REMOVE_DETAILS: 'REMOVE_DETAILS',
    FILTER_CREATED: 'FILTER_CREATED',
    ORDER_BY_NAME_OR_STRENGHT: 'ORDER_BY_NAME_OR_STRENGHT',
    ORDER_POKEMONS_ALPHABETICALLY: 'ORDER_POKEMONS_ALPHABETICALLY',
    DELETE_POKEMONS: 'DELETE_POKEMONS',
}

export function getPokemons() {
    return function (dispatch) {
      return axios
        .get('/pokemons')
        .then((response) => {
          return dispatch({
            type: actionTypes.GET_POKEMONS,
            payload: response.data,
          });
        })
        .catch((e) => {
          console.log(e);
          return alert('¡Failed to load pokemons!');
        });
    };
  }

  export function getTypes() {
    return function (dispatch) {
      return axios
        .get('/types')
        .then((response) => {
          return dispatch({ 
            type: actionTypes.GET_TYPES, 
            payload: response.data });
        })
        .catch((e) => {
          console.log(e);
          return alert('¡Failed to load types!');
        });
    };
  }

  export function getDetail(id) {
    return function (dispatch) {
      return axios
        .get(`/pokemons/${id}`)
        .then((response) => {
          return dispatch({ 
            type: actionTypes.GET_DETAILS, 
            payload: response.data });
        })
        .catch((e) => {
          console.log(e);
          return alert('¡Failed to load details');
        });
    };
  }

  export function searchPokemons(name) {
    return function (dispatch) {
      return axios
        .get(`/pokemons?name=${name}`)
        .then((response) => {
          return dispatch({
            type: actionTypes.SEARCH_POKEMONS,
            payload: response.data,
          });
        })
        .catch((e) => {
          console.log(e);
          return alert( 'Failed to load pokemons');
        });
    };
  }

  export function filterByType(type) {
    return {
      type: actionTypes.FILTER_BY_TYPE,
      payload: type,
    };
  }

  export function reloadPokemons(){
    return {
        type: actionTypes.RELOAD_POKEMONS,
    }
}

export function postPokemon(payload) {
    return function (dispatch) {
      return axios
        .post('/pokemons', payload)
        .then((response) => {
         alert ('¡Pokemon created successfully!');
          return dispatch({ 
            type: actionTypes.POST_POKEMONS, 
            payload: response});
        })
        .catch((e) => {
          console.log(e);
          return alert( 'Name already exists!<br> Please try again with a different name');
        });
    };
  }

  export function removeDetail(){
    return {
        type: actionTypes.REMOVE_DETAILS, 
    }
}

export function filterCreated(created) {
    return {
      type: actionTypes.FILTER_CREATED,
      payload: created,
    };
  }

  export function orderByNameOrStrengh(typeOfSort) {
    //typeOfSort= ascendente o descendente
    return {
      type: actionTypes.ORDER_BY_NAME_OR_STRENGHT,
      payload: typeOfSort,
    };
  }

  export function orderPokemonsAlphabetically(typeOfSort) {
    //typeOfSort= ascendente o descendente
    return {
      type: actionTypes.ORDER_POKEMONS_ALPHABETICALLY,
      payload: typeOfSort,
    };
  }

  export function deletePokemon(id) {
    return function (dispatch) {
      return axios
        .delete(`/delete/${id}`)
        .then((response) => {
            alert ('¡Pokemon deleted successfully!');
          return dispatch({ 
            type: actionTypes.DELETE_POKEMONS
         });
        })
        .catch((e) => {
          console.log(e);
          return alert('Something went wrong!<br> Please try again');
        });
    };
  }
  



  
  