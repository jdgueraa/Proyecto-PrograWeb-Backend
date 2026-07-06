const { Router } = require('express');
const donacionesController = require('../controllers/donaciones.controller');
const { verifyToken } = require('../middlewares/auth');

const router = Router();

// Hay que estar logueado para donar (se descuenta de TUS créditos).
router.post('/', verifyToken, donacionesController.crear);

module.exports = router;
