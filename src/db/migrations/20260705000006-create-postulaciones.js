'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Postulaciones', {
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
      voluntariadoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Voluntariados', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
    await queryInterface.addConstraint('Postulaciones', {
      fields: ['userId', 'voluntariadoId'],
      type: 'unique',
      name: 'unique_user_voluntariado',
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Postulaciones');
  },
};
