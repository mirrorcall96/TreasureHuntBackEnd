module.exports = (sequelize, DataTypes) => {
  const myModel = sequelize.define(
    "Item",
    {
      data: { type: DataTypes.STRING, allowNull: false },
      isTreasure: { type: DataTypes.STRING, allowNull: false },
    },
    { createdAt: false, updatedAt: false }
  );
  myModel.associate = (models) => {
    models.User.hasMany(myModel, {
      foreignKey: {
        name: "userId",
        allowNull: true,
      },
    });
    myModel.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: true,
      },
    });
  };
  return myModel;
};
