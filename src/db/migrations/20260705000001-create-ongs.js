'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ongs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: { type: Sequelize.STRING, allowNull: false },
      location: Sequelize.STRING,
      desc: Sequelize.TEXT,
      mision: Sequelize.TEXT,
      emoji: Sequelize.STRING,
      color: Sequelize.STRING,
      banner: Sequelize.STRING,
      fotoPortada: Sequelize.STRING,
      galeria: { type: Sequelize.ARRAY(Sequelize.STRING), defaultValue: [] },
      tags: { type: Sequelize.ARRAY(Sequelize.STRING), defaultValue: [] },
      anioFundacion: Sequelize.INTEGER,
      seguidores: { type: Sequelize.INTEGER, defaultValue: 0 },
      featured: { type: Sequelize.BOOLEAN, defaultValue: false },
      email: Sequelize.STRING,
      telefono: Sequelize.STRING,
      web: Sequelize.STRING,
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Ongs');
  },
};
