'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Donaciones', {
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
      campanaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Campanas', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      monto: { type: Sequelize.FLOAT, allowNull: false },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Donaciones');
  },
};
