'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ong extends Model {
    static associate(models) {
      Ong.hasMany(models.Campana, { foreignKey: 'ongId', as: 'campanas' });
      Ong.hasMany(models.Voluntariado, { foreignKey: 'ongId', as: 'voluntariados' });
      Ong.hasMany(models.User, { foreignKey: 'ongId', as: 'adminUsers' });
      Ong.hasMany(models.HistorialVoluntariado, { foreignKey: 'ongId', as: 'historialVoluntariados' });
      Ong.belongsToMany(models.User, {
        through: models.OngSeguidor,
        foreignKey: 'ongId',
        otherKey: 'userId',
        as: 'usuariosSeguidores',
      });
    }
  }
  Ong.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      location: DataTypes.STRING,
      desc: DataTypes.TEXT,
      mision: DataTypes.TEXT,
      emoji: DataTypes.STRING,
      color: DataTypes.STRING,
      banner: DataTypes.STRING,
      fotoPortada: DataTypes.STRING,
      galeria: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
      tags: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
      anioFundacion: DataTypes.INTEGER,
      seguidores: { type: DataTypes.INTEGER, defaultValue: 0 },
      featured: { type: DataTypes.BOOLEAN, defaultValue: false },
      email: DataTypes.STRING,
      telefono: DataTypes.STRING,
      web: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Ong',
      tableName: 'Ongs',
    }
  );
  return Ong;
};
