const Sequelize = require('sequelize')
const connection = require('../Database/connection')

const parts = connection.define('part_Details', {
    itemId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
         allowNull: false,
         primaryKey: true,
        },
      itemName: {
         type: Sequelize.STRING,
         allowNull: false,
       },
      itemRating: {
         type: Sequelize.FLOAT,
        allowNull: false,
       },
     reviewCount: {
         type: Sequelize.INTEGER,
         allowNull: false,
       },

     price: {
     type: Sequelize.INTEGER,
    allowNull: false,
        },
});

module.exports = parts;