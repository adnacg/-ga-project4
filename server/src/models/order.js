"use strict";
module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define(
    "Order",
    {
      deliveryStatus: DataTypes.STRING
    },
    {}
  );
  Order.associate = function(models) {
    // associations can be defined here
    Order.belongsTo(models.User, {
      foreignKey: "userId"
    });
    Order.belongsToMany(models.Product, {
      through: "OrderProduct",
      foreignKey: "orderId"
    });
  };
  return Order;
};
