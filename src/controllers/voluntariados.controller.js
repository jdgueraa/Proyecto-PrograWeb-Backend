const { Voluntariado, Ong, Postulacion, User } = require('../db/models');

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
