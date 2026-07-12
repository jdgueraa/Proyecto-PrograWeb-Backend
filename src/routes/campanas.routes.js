const { Router } = require('express');
const campanasController = require('../controllers/campanas.controller');
const { verifyToken, requireRole } = require('../middlewares/auth');

const router = Router();

router.get('/', campanasController.listar);
router.get('/:id', campanasController.obtener);

router.post('/', verifyToken, requireRole('ong'), campanasController.crear);
router.get('/:id/donaciones', verifyToken, requireRole('ong'), campanasController.listarDonaciones);

module.exports = router;
