'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Campanas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: { type: Sequelize.STRING, allowNull: false },
      meta: { type: Sequelize.FLOAT, allowNull: false },
      actual: { type: Sequelize.FLOAT, defaultValue: 0 },
      desc: Sequelize.TEXT,
      impacto: Sequelize.TEXT,
      actualizacion: Sequelize.TEXT,
      fechaInicio: Sequelize.DATEONLY,
      fechaFin: Sequelize.DATEONLY,
      beneficiarios: { type: Sequelize.INTEGER, defaultValue: 0 },
      donantes: { type: Sequelize.INTEGER, defaultValue: 0 },
      urgent: { type: Sequelize.BOOLEAN, defaultValue: false },
      category: Sequelize.STRING,
      location: Sequelize.STRING,
      imagen: Sequelize.STRING,
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
    await queryInterface.dropTable('Campanas');
  },
};
