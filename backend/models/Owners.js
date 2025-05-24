const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User'); // Assuming User model exists

const Owners = sequelize.define('Owners', {
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  location: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  measurment: {
    type: DataTypes.STRING,
    allowNull: true
  },
  face: {
    type: DataTypes.STRING, // storing image filenames
    allowNull: true
  },
  contact:{
    type: DataTypes.STRING,
    allowNull: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
},
{
  tableName: 'Owners', // Force exact table name
  freezeTableName: true 
});

// Setup association
Owners.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Owners, { foreignKey: 'userId' });

module.exports = Owners;