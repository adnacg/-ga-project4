"use strict";
module.exports = (sequelize, DataTypes) => {
  var OrderProduct = sequelize.define(
    "OrderProduct",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      count: { type: DataTypes.INTEGER }
    },
    { tableName: "OrderProduct" }
  );
  OrderProduct.associate = function(models) {
    // associations can be defined here
  };
  return OrderProduct;
};
