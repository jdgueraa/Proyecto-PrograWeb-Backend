'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      passwordHash: { type: Sequelize.STRING, allowNull: false },
      fullName: Sequelize.STRING,
      username: Sequelize.STRING,
      role: {
        type: Sequelize.ENUM('persona', 'ong'),
        allowNull: false,
        defaultValue: 'persona',
      },
      ongId: {
        type: Sequelize.INTEGER,
        references: { model: 'Ongs', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      creditos: { type: Sequelize.INTEGER, defaultValue: 200 },
      photoUrl: Sequelize.STRING,
      biografia: Sequelize.TEXT,
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Users');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Users_role";');
  },
};
