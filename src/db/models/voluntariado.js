'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Voluntariado extends Model {
    static associate(models) {
      Voluntariado.belongsTo(models.Ong, { foreignKey: 'ongId', as: 'ong' });
      Voluntariado.hasMany(models.Postulacion, { foreignKey: 'voluntariadoId', as: 'postulaciones' });
    }

    toPublicJSON() {
      const plain = this.toJSON();
      const lleno = plain.cuposOcupados >= plain.cupos;
      return {
        ...plain,
        badge: lleno ? 'Lleno' : 'Activo',
        badgeClass: lleno ? 'badge-success' : 'badge-active',
        ongName: plain.ong ? plain.ong.name : undefined,
      };
    }
  }
  Voluntariado.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      desc: DataTypes.TEXT,
      impacto: DataTypes.TEXT,
      actualizacion: DataTypes.TEXT,
      actividades: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
      requisitos: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
      location: DataTypes.STRING,
      category: DataTypes.STRING,
      modalidad: DataTypes.STRING,
      cupos: { type: DataTypes.INTEGER, allowNull: false },
      cuposOcupados: { type: DataTypes.INTEGER, defaultValue: 0 },
      duracion: DataTypes.STRING,
      fechaInicio: DataTypes.DATEONLY,
      ongId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Voluntariado',
      tableName: 'Voluntariados',
    }
  );
  return Voluntariado;
};
