module.exports = (sequelize, DataTypes) => {
  const Shelf = sequelize.define('Shelf', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
  });

  return Shelf;
};