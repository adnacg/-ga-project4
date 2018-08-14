"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "Users",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING,
          unique: true
        },
        email: {
          type: Sequelize.STRING
        },
        passwordHash: {
          type: Sequelize.STRING
        },
        address: {
          type: Sequelize.STRING
        },
        unit: {
          type: Sequelize.STRING
        },
        postal: {
          type: Sequelize.STRING
        },
        phone: {
          type: Sequelize.STRING
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      },
      {
        paranoid: true,
        timestamps: true
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Users");
  }
};
