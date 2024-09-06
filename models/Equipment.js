module.exports = (sequelize, DataTypes) => {
  const Equipment = sequelize.define('Equipment', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING },
    linha: {
      type: DataTypes.ENUM,
      values: ['1', '2', '3', '4', '5', '6', '7', '8'],
      allowNull: true,
    },
    column: {
      type: DataTypes.ENUM,
      values: ['1', '2', '3', '4', '5', '6', '7', '8'],
      allowNull: true,
    },
    inShelf: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true, 
    },
    status: {
      type: DataTypes.ENUM,
      values: ['DISPONIVEL', 'EM_USO', 'EM_MANUTENCAO'],
      allowNull: true,
    },
  });

  return Equipment;
};