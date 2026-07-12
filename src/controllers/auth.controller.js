const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Ong } = require('../db/models');

function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role, ongId: user.ongId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

async function register(req, res, next) {
  try {
    const { fullName, email, password, role } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'Completa todos los campos.' });
    }
    if (!['persona', 'ong'].includes(role)) {
      return res.status(400).json({ message: 'Rol inválido.' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existing = await User.findOne({ where: { email: normalizedEmail } });
    if (existing) {
      return res.status(409).json({ message: 'Ya existe una cuenta con ese correo.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    let ongId = null;
    if (role === 'ong') {
      const ong = await Ong.create({
        name: fullName.trim(),
        emoji: '🌿',
        color: '#d4f5e9',
        seguidores: 0,
        featured: false,
      });
      ongId = ong.id;
    }

    const user = await User.create({
      fullName: fullName.trim(),
      email: normalizedEmail,
      passwordHash,
      role,
      ongId,
      creditos: 200,
    });

    const token = signToken(user);
    return res.status(201).json({ token, user: user.toPublicJSON() });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Ingresa correo y contraseña.' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ where: { email: normalizedEmail } });
    if (!user) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos.' });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos.' });
    }

    const token = signToken(user);
    return res.json({ token, user: user.toPublicJSON() });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login };
