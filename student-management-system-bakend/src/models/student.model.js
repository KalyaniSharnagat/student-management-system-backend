const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");

const Student = sequelize.define(
    "Student",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false

        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING
        },
        dob: {
            type: DataTypes.DATEONLY
        },
        address: {
            type: DataTypes.STRING
        },
        city: {
            type: DataTypes.STRING
        },
        state: {
            type: DataTypes.STRING
        },
        pincode: {
            type: DataTypes.STRING
        },
        marks: {
            type: DataTypes.FLOAT
        },
        subject: {
            type: DataTypes.STRING
        },
        roll_no: {
            type: DataTypes.STRING
        },
        admission_date: {
            type: DataTypes.DATEONLY
        },
        // gender: {
        //     type: DataTypes.ENUM("Male", "Female", "Other")
        // },
        isActive: {
            type: DataTypes.BOOLEAN, defaultValue: true
        },
    },
    { timestamps: true }
);

module.exports = Student;
