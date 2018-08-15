"use strict";
module.exports = (sequelize, DataTypes) => {
  var CategoryProduct = sequelize.define(
    "CategoryProduct",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
    },
    { tableName: "CategoryProduct" }
  );
  CategoryProduct.associate = function(models) {
    // associations can be defined here
  };
  return CategoryProduct;
};
