// ─────────────────────────────────────────────────────────────
// users.controller.js — Perfil del usuario logueado ("Mi Perfil")
//
// Usado por:
//   • MyProfileScreen.jsx    → GET /api/me (ONGs seguidas, historial)
//   • SeguimientoScreen.jsx  → GET /api/me (donaciones + horas)
//   • ProfileOngScreen.jsx   → GET /api/me (datos de la ONG propia)
//                            → PUT /api/me (guardar cambios de perfil)
//
// Antes esta información vivía hardcodeada solo para el usuario
// demo "gatitos55"; ahora GET /api/me arma esta misma forma de
// datos para CUALQUIER usuario, a partir de sus filas reales en
// Donaciones, Postulaciones, HistorialVoluntariados y OngSeguidores.
// ─────────────────────────────────────────────────────────────

const {
  User,
  Ong,
  Donacion,
  Postulacion,
  HistorialVoluntariado,
  Campana,
  Voluntariado,
} = require('../db/models');

// GET /api/me
async function obtenerPerfil(req, res, next) {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [
        { model: Ong, as: 'ong' }, // solo tiene valor si role === 'ong'
        {
          model: Ong,
          as: 'ongsSeguidas',
          attributes: ['id', 'name', 'location', 'emoji', 'color'],
          through: { attributes: [] }, // no incluir columnas de la tabla puente
        },
        {
          model: Donacion,
          as: 'donaciones',
          // Incluimos también imagen/meta/actual/desc porque
          // MyProfileScreen.jsx usa la donación más reciente para
          // mostrar la tarjeta "Campaña más reciente" con su barra
          // de progreso — no solo el nombre.
          include: [
            {
              model: Campana,
              as: 'campana',
              attributes: ['id', 'name', 'ongId', 'imagen', 'meta', 'actual', 'desc'],
            },
          ],
        },
        {
          model: Postulacion,
          as: 'postulaciones',
          include: [{ model: Voluntariado, as: 'voluntariado', attributes: ['id', 'name'] }],
        },
        {
          model: HistorialVoluntariado,
          as: 'historialVoluntariados',
          include: [{ model: Ong, as: 'ong', attributes: ['id', 'name', 'location', 'mision'] }],
        },
      ],
    });

    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });
    return res.json(user.toPublicJSON());
  } catch (err) {
    next(err);
  }
}

// PUT /api/me — actualiza datos propios (no créditos, esos solo
// cambian a través de donar). Usado por MyProfileScreen (foto de
// perfil) y ProfileOngScreen (guardarPerfil, cuando el usuario es 'ong').
async function actualizarPerfil(req, res, next) {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });

    const campos = ['fullName', 'username', 'photoUrl', 'biografia', 'creditos'];
    campos.forEach((campo) => {
      if (req.body[campo] !== undefined) user[campo] = req.body[campo];
    });

    await user.save();
    return res.json(user.toPublicJSON());
  } catch (err) {
    next(err);
  }
}

module.exports = { obtenerPerfil, actualizarPerfil };
