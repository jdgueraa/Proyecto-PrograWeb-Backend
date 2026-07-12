const { Ong, OngSeguidor } = require('../db/models');

async function listar(req, res, next) {
  try {
    const ongs = await Ong.findAll({ order: [['id', 'ASC']] });
    return res.json(ongs);
  } catch (err) {
    next(err);
  }
}

async function obtener(req, res, next) {
  try {
    const ong = await Ong.findByPk(req.params.id);
    if (!ong) return res.status(404).json({ message: 'ONG no encontrada.' });
    return res.json(ong);
  } catch (err) {
    next(err);
  }
}

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

async function alternarSeguir(req, res, next) {
  try {
    const ong = await Ong.findByPk(req.params.id);
    if (!ong) return res.status(404).json({ message: 'ONG no encontrada.' });

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
