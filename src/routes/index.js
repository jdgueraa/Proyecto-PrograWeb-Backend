// Junta todos los módulos de rutas en uno solo. app.js monta esto
// bajo el prefijo /api, así que por ejemplo authRoutes queda
// disponible en /api/auth/login, /api/auth/register.
const { Router } = require('express');

const authRoutes = require('./auth.routes');
const ongsRoutes = require('./ongs.routes');
const campanasRoutes = require('./campanas.routes');
const voluntariadosRoutes = require('./voluntariados.routes');
const donacionesRoutes = require('./donaciones.routes');
const postulacionesRoutes = require('./postulaciones.routes');
const usersRoutes = require('./users.routes');

const router = Router();

router.use('/auth', authRoutes);
router.use('/ongs', ongsRoutes);
router.use('/campanas', campanasRoutes);
router.use('/voluntariados', voluntariadosRoutes);
router.use('/donaciones', donacionesRoutes);
router.use('/postulaciones', postulacionesRoutes);
router.use('/', usersRoutes); // expone /api/me

module.exports = router;
