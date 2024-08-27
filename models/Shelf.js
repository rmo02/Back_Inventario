module.exports = (sequelize, DataTypes) => {
    const Shelf = sequelize.define('Shelf', {
      name: { type: DataTypes.STRING, allowNull: false },
    });
  
    return Shelf;
  };
  