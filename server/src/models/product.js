"use strict";
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define(
    "Product",
    {
      name: {
        type: DataTypes.STRING,
        unique: true
      },
      img: DataTypes.STRING,
      price: DataTypes.FLOAT(10, 2)
    },
    {}
  );
  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsTo(models.Brand, {
      foreignKey: "brandId",
      onDelete: "CASCADE"
    });
    Product.belongsToMany(models.Category, {
      through: "CategoryProduct",
      foreignKey: "productId"
    });
    Product.belongsTo(models.User, {
      foreignKey: "userId"
    });
    Product.belongsToMany(models.Order, {
      through: "OrderProduct",
      foreignKey: "productId"
    });
  };
  return Product;
};
