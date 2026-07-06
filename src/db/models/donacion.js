'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Donacion extends Model {
    static associate(models) {
      Donacion.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Donacion.belongsTo(models.Campana, { foreignKey: 'campanaId', as: 'campana' });
    }
  }
  Donacion.init(
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      campanaId: { type: DataTypes.INTEGER, allowNull: false },
      monto: { type: DataTypes.FLOAT, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Donacion',
      tableName: 'Donaciones',
    }
  );
  return Donacion;
};
