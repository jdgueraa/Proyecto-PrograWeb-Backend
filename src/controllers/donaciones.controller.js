// ─────────────────────────────────────────────────────────────
// donaciones.controller.js — Registrar una donación
//
// Usado por: CampaignDetailModal.jsx → POST /api/donaciones
// (reemplaza handleDonate() que antes vivía en App.jsx y
// modificaba solo el estado local + localStorage).
// ─────────────────────────────────────────────────────────────

const { sequelize, User, Campana, Donacion } = require('../db/models');

// POST /api/donaciones  body: { campanaId, monto }
// Hace 3 cosas, como una sola operación (transacción):
//   1. Descuenta los créditos al usuario logueado.
//   2. Suma el monto a la campaña y le suma 1 donante.
//   3. Deja un registro histórico en la tabla Donaciones.
// Usamos una transacción para que, si algo falla a la mitad,
// no se quede el dinero "descontado" sin haberse sumado a la campaña.
async function crear(req, res, next) {
  const t = await sequelize.transaction();
  try {
    const { campanaId, monto } = req.body;
    const montoNumero = Number(monto);

    if (!campanaId || !montoNumero || montoNumero <= 0) {
      await t.rollback();
      return res.status(400).json({ message: 'Monto de donación inválido.' });
    }

    const user = await User.findByPk(req.user.id, { transaction: t });
    const campana = await Campana.findByPk(campanaId, { transaction: t });
    if (!campana) {
      await t.rollback();
      return res.status(404).json({ message: 'Campaña no encontrada.' });
    }

    if (user.creditos < montoNumero) {
      await t.rollback();
      return res.status(400).json({ message: 'Créditos insuficientes.' });
    }

    user.creditos -= montoNumero;
    campana.actual = Number(campana.actual) + montoNumero;
    campana.donantes += 1;

    await user.save({ transaction: t });
    await campana.save({ transaction: t });
    await Donacion.create(
      { userId: user.id, campanaId: campana.id, monto: montoNumero },
      { transaction: t }
    );

    await t.commit();

    return res.status(201).json({
      user: user.toPublicJSON(),
      campana: campana.toPublicJSON(),
    });
  } catch (err) {
    await t.rollback();
    next(err);
  }
}

module.exports = { crear };
