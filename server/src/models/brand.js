"use strict";
module.exports = (sequelize, DataTypes) => {
  var Brand = sequelize.define(
    "Brand",
    {
      name: {
        type: DataTypes.STRING,
        unique: true
      },
      img: DataTypes.STRING
    },
    {}
  );
  Brand.associate = function(models) {
    // associations can be defined here
    Brand.hasMany(models.Product, {
      foreignKey: "brandId"
    });
  };
  return Brand;
};
