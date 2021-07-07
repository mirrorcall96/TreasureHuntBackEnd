module.exports = (sequelize, DataTypes) => {
  const myModel = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      password: { type: DataTypes.STRING, allowNull: false },
      balance: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: { min: 0 },
      },
    },
    { createdAt: false, updatedAt: false }
  );
  return myModel;
};
