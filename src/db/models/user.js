'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Ong, { foreignKey: 'ongId', as: 'ong' });
      User.hasMany(models.Donacion, { foreignKey: 'userId', as: 'donaciones' });
      User.hasMany(models.Postulacion, { foreignKey: 'userId', as: 'postulaciones' });
      User.hasMany(models.HistorialVoluntariado, { foreignKey: 'userId', as: 'historialVoluntariados' });
      User.belongsToMany(models.Ong, {
        through: models.OngSeguidor,
        foreignKey: 'userId',
        otherKey: 'ongId',
        as: 'ongsSeguidas',
      });
    }

    toPublicJSON() {
      const { passwordHash, ...publicFields } = this.toJSON();
      return publicFields;
    }
  }
  User.init(
    {
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      passwordHash: { type: DataTypes.STRING, allowNull: false },
      fullName: DataTypes.STRING,
      username: DataTypes.STRING,
      role: {
        type: DataTypes.ENUM('persona', 'ong'),
        allowNull: false,
        defaultValue: 'persona',
      },
      ongId: DataTypes.INTEGER,
      creditos: { type: DataTypes.INTEGER, defaultValue: 200 },
      photoUrl: DataTypes.STRING,
      biografia: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
    }
  );
  return User;
};
