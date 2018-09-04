"use strict";
module.exports = (sequelize, DataTypes) => {
  var Robot = sequelize.define(
    "Robot",
    {
      name: DataTypes.STRING,
      status: { type: DataTypes.STRING, defaultValue: "Available" },
      poseIndex: { type: DataTypes.INTEGER, defaultValue: 0 }
    },
    {}
  );
  Robot.associate = function(models) {
    // associations can be defined here
    Robot.belongsTo(models.Order, {
      foreignKey: "orderId"
    });
  };
  return Robot;
};
