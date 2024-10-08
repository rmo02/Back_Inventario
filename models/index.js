const Sequelize = require('sequelize');
const config = require('../config/database');

const sequelize = new Sequelize(config.development);

const Shelf = require('./Shelf')(sequelize, Sequelize);
const Equipment = require('./Equipment')(sequelize, Sequelize);
const Section = require('./Section')(sequelize, Sequelize);
const Category = require('./Category')(sequelize, Sequelize);

// Associações com alias definidos
Shelf.hasMany(Equipment, { foreignKey: 'shelfId', as: 'equipments' });
Equipment.belongsTo(Shelf, { foreignKey: 'shelfId', as: 'shelf' });

Section.hasMany(Equipment, { foreignKey: 'sectionId', as: 'equipments' });
Equipment.belongsTo(Section, { foreignKey: 'sectionId', as: 'section' });

Category.hasMany(Equipment, { foreignKey: 'categoryId', as: 'equipments' }); // Uma categoria tem muitos equipamentos
Equipment.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' }); // Um equipamento pertence a uma categoria

module.exports = { sequelize, Shelf, Equipment, Section, Category };
