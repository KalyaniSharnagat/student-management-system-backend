const { Pool } = require("pg");
const dotenv = require("dotenv").config();

const pool = new Pool({
  host: process.env.PGHOST || "localhost",
  database: process.env.PGDATABASE || "student_db",
  user: process.env.PGUSER || "postgres",
  password: process.env.PGPASSWORD || "your_password",
  port: process.env.PGPORT || 5432,
  ssl: process.env.PGSSLMODE === "require" ? { rejectUnauthorized: false } : false,
});

pool.connect()
  .then(client => {
    console.log("✅ Database connected successfully!");
    client.release();
  })
  .catch(err => {
    console.error("❌ Database connection error:", err.message);
  });

module.exports = pool;
