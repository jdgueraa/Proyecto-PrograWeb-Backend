const { sequelize, Voluntariado, Postulacion } = require('../db/models');

async function crear(req, res, next) {
  const t = await sequelize.transaction();
  try {
    const { voluntariadoId } = req.body;
    if (!voluntariadoId) {
      await t.rollback();
      return res.status(400).json({ message: 'Falta indicar el voluntariado.' });
    }

    const voluntariado = await Voluntariado.findByPk(voluntariadoId, { transaction: t });
    if (!voluntariado) {
      await t.rollback();
      return res.status(404).json({ message: 'Voluntariado no encontrado.' });
    }

    if (voluntariado.cuposOcupados >= voluntariado.cupos) {
      await t.rollback();
      return res.status(400).json({ message: 'Ya no hay cupos disponibles.' });
    }

    const yaPostulado = await Postulacion.findOne({
      where: { userId: req.user.id, voluntariadoId },
      transaction: t,
    });
    if (yaPostulado) {
      await t.rollback();
      return res.status(409).json({ message: 'Ya te habías postulado a este voluntariado.' });
    }

    voluntariado.cuposOcupados += 1;
    await voluntariado.save({ transaction: t });
    const postulacion = await Postulacion.create(
      { userId: req.user.id, voluntariadoId },
      { transaction: t }
    );

    await t.commit();

    return res.status(201).json({
      postulacion,
      voluntariado: voluntariado.toPublicJSON(),
    });
  } catch (err) {
    await t.rollback();
    next(err);
  }
}

module.exports = { crear };
