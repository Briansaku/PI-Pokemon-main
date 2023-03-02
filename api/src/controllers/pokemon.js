const axios = require("axios");
const { pokemon, type } = require("../db");
const { normalizeDataApi, normalizeDataDb, } = require("../routes/normalizeFunctions");
const ModelCrud = require('./index');



// Generamos las funciones.

class PokemonModel extends ModelCrud {
    constructor(model) {
        super(model)
    }

    getPokemon = async (req, res, next) => {
        const { name } = req.query;
        try {
          let pokemons = [];
          
          if (name) {
            const nameLower = name.trim().toLowerCase();
            const pokemonDbByName = await pokemon.findOne({
              where: { name: nameLower },
              include: type,
            });
            if (pokemonDbByName) {
              pokemons.push(normalizeDataDb(pokemonDbByName));
              return res.json(pokemons);
            }
          }
      
          const dataApiResponse = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1500");
          const pokemonDataApi = dataApiResponse.data.results;
          const pokemonDataApiPromises = pokemonDataApi.map(async (p) => {
            const pokemonApiResponse = await axios.get(p.url);
            return normalizeDataApi(pokemonApiResponse);
          });
          const pokemonDataApiResults = await Promise.all(pokemonDataApiPromises);//para evitar hacer un bucle y que tarde mas
          pokemons = [...pokemons, ...pokemonDataApiResults];
          const pokemonDbResults = await pokemon.findAll({
            include: {
              model: type,
              attributes: ["name"],
              through: { attributes: [] },
            },
          });
          const pokemonDbResultsNormalized = pokemonDbResults.map(normalizeDataDb);
          pokemons = [...pokemons, ...pokemonDbResultsNormalized];
      
          return res.json(pokemons);
        } catch (error) {
          console.error(error);
          res.status(404).json({ msg: "Pokemons not found" });
        }
      }

    getById = async (req, res, next) => {
        const idPokemon = req.params.id;
      
        try {
          const pokemonDB = await this.model.findByPk(idPokemon, { include: Type });
          if (pokemonDB === null) {
            return res.status(404).json("Error, id not found: " + error);
          }
          return res.json(normalizeDataDb(pokemonDB));
        } catch {
          try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);
            const dataApiResponse = normalizeDataApi(response);
            return res.json(dataApiResponse);
          } catch (error) {
            return res.status(404).json("Error, no encuentra el id: " + error);
          }
        }
      }  

    add = async (req, res, next) => {
        const { name, types, urlImg, height, weight, hp, attack, defense, speed } =
        req.body;
    
      // Validar que se hayan recibido todos los parámetros necesarios.
      if (!name || !types) {
        return res.status(400).json("Missing required parameters");
      }
    
      try {
        // Crear el pokemon en la base de datos.
        const pokemon = await pokemon.create({
          name: name.trim().toLowerCase(),
          urlImg,
          height,
          weight,
          hp: hp || 1,
          attack: attack || 1,
          defense: defense || 1,
          speed: speed || 1,
        });
    
        // Encontrar los tipos en la base de datos.
        const typeDbArr = await type.findAll({
          where: { name: types.map((type) => type.toLowerCase()) },
        });
    
        // Relacionar el pokemon con sus tipos.
        await pokemon.addType(typeDbArr);
    
        // Encontrar el pokemon en la base de datos con sus tipos.
        const newPokemon = await pokemon.findOne({
          where: { name: name.trim().toLowerCase() },
          include: type,
        });
    
        // Normalizar la información del pokemon y enviarla como respuesta.
        const newPokemonNormalized = normalizeDataDb(newPokemon);
        return res.json(newPokemonNormalized);
      } catch (e) {
        return res.status(500).json("Error creating pokemon: " + e);
      }
    };
    
    delete = async (req, res) => {
        try {
            const id = req.params.id;
            const pokemon = await this.model.findByPk(id);
            if (pokemon !== null) {
                await pokemon.destroy();
                res.json("Pokemon deleted correctly");
            } else {
                res.status(404).json("Pokemon not found");
            }
        } catch (error) {
            res.status(500).json("Error ---> " + error);
        }
    }
    
}

const pokemonController = new PokemonModel(pokemon);

/*function getAllPokemons(req, res, next){
    return character.findAll()
    .then(character => res.send(character))
    .catch((error) => next(error));
}

function getById(req, res, next){
    const id = req.params.id;
    return character.findByPk(id)
    .then(character => res.send(character))
    .catch((error) => next(error));
}

function addPokemons(req, res, next){
    const character = req.body
    return character.create({
        ...character,
        id:uuidv4()
    })
    .then(character => res.send(character))
    .catch((error) => next(error));
}

function updatePokemons(req, res, next){
    const id = req.params.id;
    const character = req.body;
    return character.update(character, {
        where: {
            id,
        }
    })
    .then((updatedCharacter) => {
        res.send(updatedCharacter)
        .catch((error) => next(error));
    })
}

function deletePokemons(req, res){
    const id = req.params.id;
    return character.destroy({
        where: {
            id,
        }
    })
    .then(() => {
        res.sendStatus(200)
        .catch((error) => next(error));
    })
}*/

module.exports = pokemonController;/*{
    getAllPokemons,
    getById,
    addPokemons,
    updatePokemons,
    deletePokemons
}*/
