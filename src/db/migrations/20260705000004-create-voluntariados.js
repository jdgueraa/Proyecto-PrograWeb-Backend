'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Voluntariados', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: { type: Sequelize.STRING, allowNull: false },
      desc: Sequelize.TEXT,
      impacto: Sequelize.TEXT,
      actualizacion: Sequelize.TEXT,
      actividades: { type: Sequelize.ARRAY(Sequelize.STRING), defaultValue: [] },
      requisitos: { type: Sequelize.ARRAY(Sequelize.STRING), defaultValue: [] },
      location: Sequelize.STRING,
      category: Sequelize.STRING,
      modalidad: Sequelize.STRING,
      cupos: { type: Sequelize.INTEGER, allowNull: false },
      cuposOcupados: { type: Sequelize.INTEGER, defaultValue: 0 },
      duracion: Sequelize.STRING,
      fechaInicio: Sequelize.DATEONLY,
      ongId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Ongs', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Voluntariados');
  },
};
