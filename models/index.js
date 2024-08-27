const Sequelize = require('sequelize');
const config = require('../config/database');
const sequelize = new Sequelize(config.development);

const Shelf = require('./Shelf')(sequelize, Sequelize);
const Equipment = require('./Equipment')(sequelize, Sequelize);

Shelf.hasMany(Equipment, { foreignKey: 'shelfId' });
Equipment.belongsTo(Shelf, { foreignKey: 'shelfId' });

module.exports = { sequelize, Shelf, Equipment };