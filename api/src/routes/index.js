const { Router } = require('express');
const pokemonRoutes = require ('./pokemon');
const typeRoutes = require ('./type');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('./pokemon', pokemonRoutes);
router.use('./type', typeRoutes);

module.exports = router;
