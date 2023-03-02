export const sortById = (arr) => {
    return arr.sort((a, b) => {
      if (a.id > b.id) {
        return 1;
      }
      if (b.id > a.id) {
        return -1;
      }
      return 0;
    });
  };

  export const sortByAttribute =(list, attribute, direction) => {
    return list.sort((a, b) => {
      const valueA = a[attribute];
      const valueB = b[attribute];
      let comparison = 0;
      if (valueA > valueB) {
        comparison = 1;
      } else if (valueA < valueB) {
        comparison = -1;
      }
      return direction === 'asc' ? comparison : comparison * -1;
    });
  }

  export const sortPokemonsAlphabetically = (pokemons, sortOrder) => {
    if (sortOrder === "asc") {
      return pokemons?.slice().sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      });
    } else if (sortOrder === "desc") {
      return pokemons?.slice().sort((a, b) => {
        if (a.name > b.name) return -1;
        if (a.name < b.name) return 1;
        return 0;
      });
    } else {
      return pokemons;
    }
  }
  
  
  export const filterByCreateInDb = (pokemons, created) => {
    return pokemons.filter((pokemon) => pokemon.createInDb === created);
  }
  