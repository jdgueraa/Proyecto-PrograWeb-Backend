require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.use('/api', routes);

app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada.' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Error interno del servidor.' });
});

module.exports = app;
