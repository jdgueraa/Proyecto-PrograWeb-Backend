'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HistorialVoluntariados', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      ongId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Ongs', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      campanaId: {
        type: Sequelize.INTEGER,
        references: { model: 'Campanas', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      horasAportadas: { type: Sequelize.INTEGER, defaultValue: 0 },
      fechaParticipacion: Sequelize.DATEONLY,
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('HistorialVoluntariados');
  },
};
