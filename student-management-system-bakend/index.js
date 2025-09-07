const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { Pool } = require("pg");


// Initialize Express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Load environment variables
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT, PGSSLMODE } = process.env;

// PostgreSQL connection pool
const pool = new Pool({
  host: PGHOST || "localhost",
  database: PGDATABASE || "student_db",
  user: PGUSER || "postgres",
  password: PGPASSWORD || "your_password",
  port: PGPORT || 5432,
  ssl: PGSSLMODE === "require" ? { rejectUnauthorized: false } : false,
});

// ✅ Test database connection
pool.connect()
  .then(client => {
    console.log("✅ Database connected successfully!");
    client.release();
  })
  .catch(err => {
    console.error("❌ Database connection error:", err.message);
    console.error("🔹 Check if PostgreSQL is running and your .env values are correct.");
  });

// Base route
app.get("/", (req, res) => {
  res.json({ message: "API is running..." });
});

// =========================
// GET all students
// =========================
app.get("/students", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM students");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching students:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// =========================
// POST route to create a new student
// =========================
// =========================
// POST route to create a new student
// =========================
app.post("/api/create-student", async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      phone,
      dob,
      gender,
      address,
      city,
      state,
      pincode,
      marks,
      subject,
      roll_no,
      admission_date
    } = req.body;

    // ✅ Step 1: Check if email already exists
    const emailCheck = await pool.query("SELECT * FROM students WHERE email = $1", [email]);
    if (emailCheck.rows.length > 0) {
      return res.status(400).json({ success: false, error: "Email already exists" });
    }

    // ✅ Step 2: Insert student
    const query = `
      INSERT INTO students (
        first_name, last_name, email, phone, dob, gender,
        address, city, state, pincode, marks, subject, roll_no, admission_date
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *;
    `;

    const values = [
      first_name,
      last_name,
      email,
      phone,
      dob,
      gender,
      address,
      city,
      state,
      pincode,
      marks,
      subject,
      roll_no,
      admission_date
    ];

    const result = await pool.query(query, values);

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      student: result.rows[0],
    });
  } catch (error) {
    console.error("Error creating student:", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});



// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
