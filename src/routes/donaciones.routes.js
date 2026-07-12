const { Router } = require('express');
const donacionesController = require('../controllers/donaciones.controller');
const { verifyToken } = require('../middlewares/auth');

const router = Router();

router.post('/', verifyToken, donacionesController.crear);

module.exports = router;
