'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Postulacion extends Model {
    static associate(models) {
      Postulacion.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Postulacion.belongsTo(models.Voluntariado, { foreignKey: 'voluntariadoId', as: 'voluntariado' });
    }
  }
  Postulacion.init(
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      voluntariadoId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Postulacion',
      tableName: 'Postulaciones',
    }
  );
  return Postulacion;
};
