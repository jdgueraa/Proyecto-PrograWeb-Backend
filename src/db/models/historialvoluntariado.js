'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class HistorialVoluntariado extends Model {
    static associate(models) {
      HistorialVoluntariado.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      HistorialVoluntariado.belongsTo(models.Ong, { foreignKey: 'ongId', as: 'ong' });
      HistorialVoluntariado.belongsTo(models.Campana, { foreignKey: 'campanaId', as: 'campana' });
    }
  }
  HistorialVoluntariado.init(
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      ongId: { type: DataTypes.INTEGER, allowNull: false },
      campanaId: DataTypes.INTEGER,
      horasAportadas: { type: DataTypes.INTEGER, defaultValue: 0 },
      fechaParticipacion: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: 'HistorialVoluntariado',
      tableName: 'HistorialVoluntariados',
    }
  );
  return HistorialVoluntariado;
};
