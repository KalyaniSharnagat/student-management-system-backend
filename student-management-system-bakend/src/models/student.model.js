const pool = require('../db/db');

// Create Student in DB
async function createStudent(data) {
  const {
    first_name, last_name, email, phone, dob, gender,
    address, city, state, pincode, marks, subject,
    roll_no, admission_date
  } = data;

  const query = `
    INSERT INTO students 
    (first_name, last_name, email, phone, dob, gender, address, city, state, pincode, marks, subject, roll_no, admission_date)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
    RETURNING *;
  `;

  const values = [
    first_name, last_name, email, phone, dob, gender,
    address, city, state, pincode, marks, subject,
    roll_no, admission_date
  ];

  const { rows } = await pool.query(query, values);
  return rows[0];
}

module.exports = { createStudent };
