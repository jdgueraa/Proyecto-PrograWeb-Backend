const { Router } = require('express');
const ongsController = require('../controllers/ongs.controller');
const { verifyToken } = require('../middlewares/auth');

const router = Router();

// Lectura pública: cualquiera puede ver ONGs sin loguearse.
router.get('/', ongsController.listar);
router.get('/:id', ongsController.obtener);

// Escritura: requiere estar logueado (verifyToken llena req.user).
router.put('/:id', verifyToken, ongsController.actualizar);
router.post('/:id/follow', verifyToken, ongsController.alternarSeguir);

module.exports = router;
