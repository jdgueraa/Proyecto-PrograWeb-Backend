const { Router } = require('express');
const usersController = require('../controllers/users.controller');
const { verifyToken } = require('../middlewares/auth');

const router = Router();

router.get('/me', verifyToken, usersController.obtenerPerfil);
router.put('/me', verifyToken, usersController.actualizarPerfil);

module.exports = router;
