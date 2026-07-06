// ─────────────────────────────────────────────────────────────
// ongs.controller.js — Listado, perfil y "seguir" ONGs
//
// Usado por:
//   • SearchScreen.jsx   → GET /api/ongs         (buscar/filtrar)
//   • ProfileScreen.jsx  → GET /api/ongs/:id      (ver perfil)
//                        → POST /api/ongs/:id/follow (seguir/dejar de seguir)
//   • ProfileOngScreen.jsx → PUT /api/ongs/:id    (editar perfil, solo el dueño)
// ─────────────────────────────────────────────────────────────

const { Ong, OngSeguidor } = require('../db/models');

// GET /api/ongs — todas las ONGs (SearchScreen filtra por texto/categoría
// en el propio frontend, igual que hacía antes con data.json).
async function listar(req, res, next) {
  try {
    const ongs = await Ong.findAll({ order: [['id', 'ASC']] });
    return res.json(ongs);
  } catch (err) {
    next(err);
  }
}

// GET /api/ongs/:id — perfil completo de una ONG (para ProfileScreen.jsx).
async function obtener(req, res, next) {
  try {
    const ong = await Ong.findByPk(req.params.id);
    if (!ong) return res.status(404).json({ message: 'ONG no encontrada.' });
    return res.json(ong);
  } catch (err) {
    next(err);
  }
}

// PUT /api/ongs/:id — actualiza los datos de la ONG.
// Solo lo puede hacer el usuario 'ong' dueño de esa organización
// (comparamos req.user.ongId, que viene del token, contra el :id de la URL).
async function actualizar(req, res, next) {
  try {
    const ong = await Ong.findByPk(req.params.id);
    if (!ong) return res.status(404).json({ message: 'ONG no encontrada.' });

    if (req.user.role !== 'ong' || req.user.ongId !== ong.id) {
      return res.status(403).json({ message: 'No puedes editar esta ONG.' });
    }

    const campos = ['name', 'location', 'desc', 'mision', 'emoji', 'color', 'email', 'telefono', 'web'];
    campos.forEach((campo) => {
      if (req.body[campo] !== undefined) ong[campo] = req.body[campo];
    });

    await ong.save();
    return res.json(ong);
  } catch (err) {
    next(err);
  }
}

// POST /api/ongs/:id/follow — alterna entre seguir y dejar de seguir.
// Reemplaza el toggleSeguir() que antes vivía en ProfileScreen.jsx
// y solo actualizaba el estado local del usuario en memoria.
async function alternarSeguir(req, res, next) {
  try {
    const ong = await Ong.findByPk(req.params.id);
    if (!ong) return res.status(404).json({ message: 'ONG no encontrada.' });

    // Buscamos si ya existe la fila puente (userId, ongId) en OngSeguidores.
    const existente = await OngSeguidor.findOne({
      where: { userId: req.user.id, ongId: ong.id },
    });

    let siguiendo;
    if (existente) {
      await existente.destroy();
      ong.seguidores = Math.max(0, ong.seguidores - 1);
      siguiendo = false;
    } else {
      await OngSeguidor.create({ userId: req.user.id, ongId: ong.id });
      ong.seguidores += 1;
      siguiendo = true;
    }
    await ong.save();

    return res.json({ siguiendo, seguidores: ong.seguidores });
  } catch (err) {
    next(err);
  }
}

module.exports = { listar, obtener, actualizar, alternarSeguir };
