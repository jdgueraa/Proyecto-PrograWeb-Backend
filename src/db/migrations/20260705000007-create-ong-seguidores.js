'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OngSeguidores', {
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
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
    await queryInterface.addConstraint('OngSeguidores', {
      fields: ['userId', 'ongId'],
      type: 'unique',
      name: 'unique_user_ong_seguidor',
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('OngSeguidores');
  },
};
