"use strict";
module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define(
    "Category",
    {
      name: {
        type: DataTypes.STRING,
        unique: true
      }
    },
    {}
  );
  Category.associate = function(models) {
    // associations can be defined here
    Category.belongsToMany(models.Product, {
      through: { model: models.CategoryProduct, unique: false },
      foreignKey: "categoryId"
    });
  };
  return Category;
};
