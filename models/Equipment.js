module.exports = (sequelize, DataTypes) => {
    const Equipment = sequelize.define('Equipment', {
      name: { type: DataTypes.STRING, allowNull: false },
      image: { type: DataTypes.STRING },
    });
  
    return Equipment;
  };
  