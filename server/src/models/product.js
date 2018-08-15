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
      through: { model: models.CategoryProduct, unique: false },
      foreignKey: "productId"
    });
    Product.belongsToMany(models.User, {
      through: { model: models.UserProduct, unique: false },
      foreignKey: "productId"
    });
    Product.belongsToMany(models.Order, {
      through: { model: models.OrderProduct, unique: false },
      foreignKey: "productId"
    });
  };
  return Product;
};
