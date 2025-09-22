const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(
    process.env.PGDATABASE || "neondb",
    process.env.PGUSER || "neondb_owner",
    process.env.PGPASSWORD || "",
    {
        host: process.env.PGHOST,
        dialect: "postgres",
        logging: false,
        dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Postgres connected successfully.");
    } catch (error) {
        console.error("❌ Unable to connect to Postgres:", error);
    }
};

const createTables = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log("✅ All tables created successfully.");
    } catch (error) {
        console.error("❌ Error creating tables:", error);
    }
};

module.exports = { sequelize, connectDB, createTables };
