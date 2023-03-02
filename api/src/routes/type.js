const {Router} = require('express'); //Esto es siemrpe igual.
const typeController = require ('../controllers/type')
const router = Router(); //Esto es siemrpe igual.

router.get('/types', typeController.getType);
router.get('/:id', typeController.getById);
router.post('/', typeController.add);
router.put('/:id', typeController.update);
router.delete('/:id', typeController.delete);


module.exports= router;