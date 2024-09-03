module.exports = (sequelize,DataTypes) => {
    const Section = sequelize.define('Section', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
          },
          name: { type: DataTypes.STRING, allowNull: false },

    })
    return Section;
}