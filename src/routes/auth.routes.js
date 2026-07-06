// Rutas de autenticación: define las "direcciones" (URLs) y qué
// función del controller responde cada una. No tiene lógica propia,
// solo conecta URL -> controller.
const { Router } = require('express');
const authController = require('../controllers/auth.controller');

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
