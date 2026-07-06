const { Router } = require('express');
const campanasController = require('../controllers/campanas.controller');
const { verifyToken, requireRole } = require('../middlewares/auth');

const router = Router();

router.get('/', campanasController.listar);
router.get('/:id', campanasController.obtener);

// Solo una ONG logueada puede crear campañas.
router.post('/', verifyToken, requireRole('ong'), campanasController.crear);

// Solo la ONG dueña puede ver la lista de donantes de su campaña.
router.get('/:id/donaciones', verifyToken, requireRole('ong'), campanasController.listarDonaciones);

module.exports = router;
