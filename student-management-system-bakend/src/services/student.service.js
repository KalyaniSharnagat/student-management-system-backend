const pool = require("../db/db");

// GET all students
const getAllStudents = async () => {
    const result = await pool.query("SELECT * FROM students");
    return result.rows;
};

// CREATE student
const createStudent = async (studentData) => {
    const { first_name, last_name, email, phone, dob, gender, address, city, state, pincode, marks, subject, roll_no, admission_date } = studentData;

    const emailCheck = await pool.query("SELECT * FROM students WHERE email = $1", [email]);
    if (emailCheck.rows.length > 0) throw new Error("Email already exists");

    const query = `
    INSERT INTO students (
      first_name, last_name, email, phone, dob, gender,
      address, city, state, pincode, marks, subject, roll_no, admission_date
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
    RETURNING *;
  `;
    const values = [first_name, last_name, email, phone, dob, gender, address, city, state, pincode, marks, subject, roll_no, admission_date];
    const result = await pool.query(query, values);
    return result.rows[0];
};

// UPDATE student by ID
const updateStudent = async (id, studentData) => {
    const keys = Object.keys(studentData);
    const values = Object.values(studentData);

    const setQuery = keys.map((key, index) => `${key}=$${index + 1}`).join(", ");
    const query = `UPDATE students SET ${setQuery} WHERE id=$${keys.length + 1} RETURNING *`;
    const result = await pool.query(query, [...values, id]);

    if (result.rows.length === 0) throw new Error("Student not found");
    return result.rows[0];
};

// DELETE student by ID
const deleteStudent = async (id) => {
    const result = await pool.query(
        "DELETE FROM students WHERE id=$1 RETURNING *",
        [id]
    );

    if (result.rows.length === 0) {
        throw new Error("Student not found"); // <-- this is why you see the error
    }

    return result.rows[0];
};



module.exports = { getAllStudents, createStudent, updateStudent, deleteStudent };
