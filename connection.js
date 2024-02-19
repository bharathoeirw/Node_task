const Sequelize = require('sequelize')

const connection = new Sequelize('uitoux', 'root', '', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = connection;
