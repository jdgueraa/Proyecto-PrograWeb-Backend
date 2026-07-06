'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OngSeguidor extends Model {
    static associate(models) {
      OngSeguidor.belongsTo(models.User, { foreignKey: 'userId' });
      OngSeguidor.belongsTo(models.Ong, { foreignKey: 'ongId' });
    }
  }
  OngSeguidor.init(
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      ongId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: 'OngSeguidor',
      tableName: 'OngSeguidores',
    }
  );
  return OngSeguidor;
};
