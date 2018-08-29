"use strict";
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      passwordHash: DataTypes.STRING,
      block: DataTypes.STRING,
      level: DataTypes.STRING,
      unit: DataTypes.STRING,
      phone: DataTypes.STRING,
      role: DataTypes.STRING
    },
    {
      paranoid: true,
      timestamps: true
    }
  );
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Product, {
      through: { model: models.UserProduct, unique: false },
      foreignKey: "userId"
    });
    User.hasMany(models.Order, {
      foreignKey: "userId"
    });
  };
  return User;
};
