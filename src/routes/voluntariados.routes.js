const { Router } = require('express');
const voluntariadosController = require('../controllers/voluntariados.controller');
const { verifyToken, requireRole } = require('../middlewares/auth');

const router = Router();

router.get('/', voluntariadosController.listar);
router.get('/:id', voluntariadosController.obtener);

router.post('/', verifyToken, requireRole('ong'), voluntariadosController.crear);
router.get('/:id/postulaciones', verifyToken, requireRole('ong'), voluntariadosController.listarPostulaciones);

module.exports = router;
