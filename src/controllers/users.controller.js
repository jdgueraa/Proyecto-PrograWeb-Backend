const {
  User,
  Ong,
  Donacion,
  Postulacion,
  HistorialVoluntariado,
  Campana,
  Voluntariado,
} = require('../db/models');

async function obtenerPerfil(req, res, next) {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [
        { model: Ong, as: 'ong' },
        {
          model: Ong,
          as: 'ongsSeguidas',
          attributes: ['id', 'name', 'location', 'emoji', 'color'],
          through: { attributes: [] },
        },
        {
          model: Donacion,
          as: 'donaciones',
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

async function actualizarPerfil(req, res, next) {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });

    // creditos no está en esta lista: solo puede cambiar por donar o recargar.
    const campos = ['fullName', 'username', 'photoUrl', 'biografia'];
    campos.forEach((campo) => {
      if (req.body[campo] !== undefined) user[campo] = req.body[campo];
    });

    await user.save();
    return res.json(user.toPublicJSON());
  } catch (err) {
    next(err);
  }
}

async function agregarCreditos(req, res, next) {
  try {
    const { monto } = req.body;
    const montoNumero = Number(monto);

    if (!montoNumero || montoNumero <= 0) {
      return res.status(400).json({ message: 'El monto a recargar debe ser mayor a 0.' });
    }

    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });

    user.creditos = Number(user.creditos) + montoNumero;
    await user.save();

    return res.json(user.toPublicJSON());
  } catch (err) {
    next(err);
  }
}

module.exports = { obtenerPerfil, actualizarPerfil, agregarCreditos };
