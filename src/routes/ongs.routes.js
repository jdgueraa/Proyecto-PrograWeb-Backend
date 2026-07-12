const { Router } = require('express');
const ongsController = require('../controllers/ongs.controller');
const { verifyToken } = require('../middlewares/auth');

const router = Router();

router.get('/', ongsController.listar);
router.get('/:id', ongsController.obtener);

router.put('/:id', verifyToken, ongsController.actualizar);
router.post('/:id/follow', verifyToken, ongsController.alternarSeguir);

module.exports = router;
