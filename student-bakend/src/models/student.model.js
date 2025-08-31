const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");

const Student = sequelize.define("Student", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  class: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { timestamps: true });

module.exports = Student;
