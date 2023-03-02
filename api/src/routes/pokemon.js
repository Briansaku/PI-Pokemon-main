const {Router} = require('express'); //Esto es siemrpe igual.
const pokemonController = require ('../controllers/pokemon')
const router = Router(); //Esto es siemrpe igual.

router.get('/pokemons', pokemonController.getPokemon);
router.get('/pokemon/:idPokemon', pokemonController.getById);
router.post('/pokemons', pokemonController.add);
router.put('/put/:id', pokemonController.update);
router.delete('/delete/:id', pokemonController.delete);


module.exports = router;