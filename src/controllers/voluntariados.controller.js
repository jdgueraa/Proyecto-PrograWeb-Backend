// ─────────────────────────────────────────────────────────────
// voluntariados.controller.js — Oportunidades de voluntariado
//
// Usado por:
//   • VoluntariadoScreen.jsx → GET /api/voluntariados
//   • AdminScreen.jsx        → POST /api/voluntariados (crear, rol 'ong')
//                            → GET /api/voluntariados/:id/postulaciones
//
// Igual que en campañas, badge/badgeClass ("Activo"/"Lleno") se
// calculan al vuelo en Voluntariado.toPublicJSON() comparando
// cuposOcupados vs cupos.
// ─────────────────────────────────────────────────────────────

const { Voluntariado, Ong, Postulacion, User } = require('../db/models');

// GET /api/voluntariados
async function listar(req, res, next) {
  try {
    const voluntariados = await Voluntariado.findAll({
      include: [{ model: Ong, as: 'ong', attributes: ['id', 'name'] }],
      order: [['id', 'ASC']],
    });
    return res.json(voluntariados.map((v) => v.toPublicJSON()));
  } catch (err) {
    next(err);
  }
}

// GET /api/voluntariados/:id
async function obtener(req, res, next) {
  try {
    const voluntariado = await Voluntariado.findByPk(req.params.id, {
      include: [{ model: Ong, as: 'ong', attributes: ['id', 'name'] }],
    });
    if (!voluntariado) return res.status(404).json({ message: 'Voluntariado no encontrado.' });
    return res.json(voluntariado.toPublicJSON());
  } catch (err) {
    next(err);
  }
}

// POST /api/voluntariados — crea un voluntariado para la ONG logueada.
// Equivalente a handleCrearVoluntariado() en AdminScreen.jsx.
async function crear(req, res, next) {
  try {
    const { name, desc, category, modalidad, cupos, duracion, fechaInicio, location } = req.body;

    if (!name || !desc || !cupos || !location) {
      return res.status(400).json({ message: 'Completa todos los campos obligatorios.' });
    }

    const voluntariado = await Voluntariado.create({
      name: name.trim(),
      desc: desc.trim(),
      impacto: desc.trim(),
      actividades: [],
      requisitos: [],
      location: location.trim(),
      category,
      modalidad,
      cupos: Number(cupos),
      cuposOcupados: 0,
      duracion: duracion || 'Por definir',
      fechaInicio: fechaInicio || new Date().toISOString().split('T')[0],
      ongId: req.user.ongId,
    });

    return res.status(201).json(voluntariado.toPublicJSON());
  } catch (err) {
    next(err);
  }
}

// GET /api/voluntariados/:id/postulaciones — lista de postulantes.
// Reemplaza la lectura de localStorage('postulaciones') que hacía
// AdminScreen.jsx. Solo la puede ver la ONG dueña del voluntariado.
async function listarPostulaciones(req, res, next) {
  try {
    const voluntariado = await Voluntariado.findByPk(req.params.id);
    if (!voluntariado) return res.status(404).json({ message: 'Voluntariado no encontrado.' });

    if (req.user.role !== 'ong' || req.user.ongId !== voluntariado.ongId) {
      return res.status(403).json({ message: 'No puedes ver los postulantes de este voluntariado.' });
    }

    const postulaciones = await Postulacion.findAll({
      where: { voluntariadoId: voluntariado.id },
      include: [{ model: User, as: 'user', attributes: ['id', 'fullName', 'email'] }],
      order: [['createdAt', 'DESC']],
    });

    return res.json(postulaciones);
  } catch (err) {
    next(err);
  }
}

module.exports = { listar, obtener, crear, listarPostulaciones };
