// ─────────────────────────────────────────────────────────────
// campanas.controller.js — Campañas de donación
//
// Usado por:
//   • DonationsScreen.jsx → GET /api/campanas (listar y filtrar en el frontend)
//   • HomeScreen.jsx      → GET /api/campanas (campañas urgentes)
//   • AdminScreen.jsx     → POST /api/campanas (crear, solo rol 'ong')
//                         → GET /api/campanas/:id/donaciones (ver donantes)
//
// Nota: badge/badgeClass ("Activa"/"¡Lograda!") NO se guardan en la
// base de datos — se calculan al vuelo en Campana.toPublicJSON()
// comparando actual vs meta, así nunca quedan desactualizados.
// ─────────────────────────────────────────────────────────────

const { Campana, Ong, Donacion, User } = require('../db/models');

// GET /api/campanas — todas las campañas con el nombre de su ONG incluido.
async function listar(req, res, next) {
  try {
    const campanas = await Campana.findAll({
      include: [{ model: Ong, as: 'ong', attributes: ['id', 'name'] }],
      order: [['id', 'ASC']],
    });
    return res.json(campanas.map((c) => c.toPublicJSON()));
  } catch (err) {
    next(err);
  }
}

// GET /api/campanas/:id
async function obtener(req, res, next) {
  try {
    const campana = await Campana.findByPk(req.params.id, {
      include: [{ model: Ong, as: 'ong', attributes: ['id', 'name'] }],
    });
    if (!campana) return res.status(404).json({ message: 'Campaña no encontrada.' });
    return res.json(campana.toPublicJSON());
  } catch (err) {
    next(err);
  }
}

// POST /api/campanas — crea una campaña nueva para la ONG del usuario logueado.
// Equivalente a handleCrearCampaña() en AdminScreen.jsx, pero ahora
// guardado en la base de datos en vez de en el estado de React.
async function crear(req, res, next) {
  try {
    const { name, desc, meta, category, location, fechaInicio, fechaFin, urgent } = req.body;

    if (!name || !desc || !meta || !location) {
      return res.status(400).json({ message: 'Completa todos los campos obligatorios.' });
    }

    const campana = await Campana.create({
      name: name.trim(),
      desc: desc.trim(),
      impacto: desc.trim(),
      meta: Number(meta),
      actual: 0,
      donantes: 0,
      urgent: Boolean(urgent),
      category,
      location: location.trim(),
      fechaInicio: fechaInicio || new Date().toISOString().split('T')[0],
      fechaFin: fechaFin || null,
      beneficiarios: 0,
      ongId: req.user.ongId,
    });

    return res.status(201).json(campana.toPublicJSON());
  } catch (err) {
    next(err);
  }
}

// GET /api/campanas/:id/donaciones — lista de quién donó a esta campaña.
// Reemplaza la lectura de localStorage('donacionesLog') que hacía
// AdminScreen.jsx para mostrar la lista de donantes por campaña.
// Solo la puede ver la ONG dueña de la campaña.
async function listarDonaciones(req, res, next) {
  try {
    const campana = await Campana.findByPk
    if (!campana) return res.status(404).json({ message: 'Campaña no encontrada.' });

    if (req.user.role !== 'ong' || req.user.ongId !== campana.ongId) {
      return res.status(403).json({ message: 'No puedes ver los donantes de esta campaña.' });
    }

    const donaciones = await Donacion.findAll({
      where: { campanaId: campana.id },
      include: [{ model: User, as: 'user', attributes: ['id', 'fullName', 'email'] }],
      order: [['createdAt', 'DESC']],
    });

    return res.json(donaciones);
  } catch (err) {
    next(err);
  }
}

module.exports = { listar, obtener, crear, listarDonaciones };
