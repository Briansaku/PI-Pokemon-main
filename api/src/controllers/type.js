const axios = require('axios');
const { type } = require("../db");
const { normalizeDataTypes } = require("../routes/normalizeFunctions");
const ModelCrud = require('./index'); //Traigo directamente la clase.

class TypeModel extends ModelCrud {
    constructor(model) {
        super(model)
    }
    getType = async (req, res, next) => {
        try {
            const { data: { results: typesDataApi } } = await axios.get("https://pokeapi.co/api/v2/type");
            const typesApi = typesDataApi?.map((type) => type.name.toLowerCase());
            
            const typesToDBPromises = [];
            typesApi?.forEach(async (type) => {
              const [createdType] = await type.findOrCreate({ where: { name: type } });
              typesToDBPromises.push(createdType);
            });
            await Promise.all(typesToDBPromises);
            
            const typesDB = await type.findAll();
            const typesDbNormalized = normalizeDataTypes(typesDB);
            
            return res.json(typesDbNormalized);
          } catch (error) {
            return res.status(404).json(error);
          }
        }
}

const typeController = new TypeModel(type);

module.exports = typeController;