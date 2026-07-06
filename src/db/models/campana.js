'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Campana extends Model {
    static associate(models) {
      Campana.belongsTo(models.Ong, { foreignKey: 'ongId', as: 'ong' });
      Campana.hasMany(models.Donacion, { foreignKey: 'campanaId', as: 'donaciones' });
      Campana.hasMany(models.HistorialVoluntariado, { foreignKey: 'campanaId', as: 'historialVoluntariados' });
    }

    toPublicJSON() {
      const plain = this.toJSON();
      const lograda = plain.actual >= plain.meta;
      return {
        ...plain,
        badge: lograda ? '¡Lograda!' : 'Activa',
        badgeClass: lograda ? 'badge-success' : 'badge-active',
        ongName: plain.ong ? plain.ong.name : undefined,
      };
    }
  }
  Campana.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      meta: { type: DataTypes.FLOAT, allowNull: false },
      actual: { type: DataTypes.FLOAT, defaultValue: 0 },
      desc: DataTypes.TEXT,
      impacto: DataTypes.TEXT,
      actualizacion: DataTypes.TEXT,
      fechaInicio: DataTypes.DATEONLY,
      fechaFin: DataTypes.DATEONLY,
      beneficiarios: { type: DataTypes.INTEGER, defaultValue: 0 },
      donantes: { type: DataTypes.INTEGER, defaultValue: 0 },
      urgent: { type: DataTypes.BOOLEAN, defaultValue: false },
      category: DataTypes.STRING,
      location: DataTypes.STRING,
      imagen: DataTypes.STRING,
      ongId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Campana',
      tableName: 'Campanas',
    }
  );
  return Campana;
};
