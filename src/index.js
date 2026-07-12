const app = require('./app');
const { sequelize } = require('./db/models');

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('No se pudo conectar a la base de datos:', err.message);
    process.exit(1);
  }
}

start();
