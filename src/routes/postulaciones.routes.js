const { Router } = require('express');
const postulacionesController = require('../controllers/postulaciones.controller');
const { verifyToken } = require('../middlewares/auth');

const router = Router();

router.post('/', verifyToken, postulacionesController.crear);

module.exports = router;
