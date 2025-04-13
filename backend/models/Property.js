const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User'); // Assuming User model exists

const Property = sequelize.define('Property', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING), // storing image filenames
    allowNull: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
},
{
  tableName: 'Property', // Force exact table name
  freezeTableName: true 
});

// Setup association
Property.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Property, { foreignKey: 'userId' });

module.exports = Property;