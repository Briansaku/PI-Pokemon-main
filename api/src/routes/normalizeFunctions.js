const normalizeDataDb = (pokemonDb) => {
    const {
      name,
      types,
      urlImg,
      id,
      height,
      weight,
      hp,
      attack,
      defense,
      speed,
      createInDb,
    } = pokemonDb;

      return {
        ...pokemonDb,
        name: name.replace(/^\w/, (c) => c.toUpperCase()),
        types: types?.map((type) => type.name.replace(/^\w/, (c) => c.toUpperCase())),
      };
    };

    const normalizeDataApi = (responseAPI) => {
        const name = responseAPI.data.name;
        const types = responseAPI.data.types;
        const stats = responseAPI.data.stats;
      
        const normalizedTypes = types && types.length > 0
          ? types.map((elem) => elem.type.name.charAt(0).toUpperCase() + elem.type.name.slice(1))
          : undefined;
      
        const normalizedStats = {};
        stats.forEach(stat => {
          normalizedStats[stat.stat.name] = stat.base_stat;
        });
      
        return {
          name: name.charAt(0).toUpperCase() + name.slice(1),
          types: normalizedTypes,
          urlImg: responseAPI.data.sprites.other["official-artwork"].front_default,
          id: responseAPI.data.id,
          height: responseAPI.data.height,
          weight: responseAPI.data.weight,
          hp: normalizedStats.hp,
          speed: normalizedStats.speed,
          attack: normalizedStats.attack,
          defense: normalizedStats.defense,
          createInDb: false,
        };
      };

      const normalizeDataTypes = (types) => {
        return types?.map(({ dataValues: { id, name } }) => ({
          id,
          name: name.charAt(0).toUpperCase() + name.slice(1),
        }));
      };
      
      module.exports = { normalizeDataApi, normalizeDataDb, normalizeDataTypes };
      
      
      
      
      