const pool = require("../config/db"); // adjust based on your path

const createStudent = async (studentData) => {
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
    } = studentData;

    // ✅ Check if email already exists
    const emailCheck = await pool.query("SELECT * FROM students WHERE email = $1", [email]);
    if (emailCheck.rows.length > 0) {
        return { success: false, error: "Email already exists" };
    }

    // Insert query
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
    return { success: true, student: result.rows[0] };
};

// =======================
const updateStudent = async (id, studentData) => {
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
    } = studentData;

    // Check if student exists
    const studentExists = await pool.query("SELECT * FROM students WHERE id = $1", [id]);
    if (studentExists.rows.length === 0) {
        return { success: false, error: "Student not found" };
    }

    // Check if another student already has this email
    const emailCheck = await pool.query(
        "SELECT * FROM students WHERE email = $1 AND id != $2",
        [email, id]
    );
    if (emailCheck.rows.length > 0) {
        return { success: false, error: "Email already exists" };
    }

    const query = `
    UPDATE students 
    SET 
      first_name = $1,
      last_name = $2,
      email = $3,
      phone = $4,
      dob = $5,
      gender = $6,
      address = $7,
      city = $8,
      state = $9,
      pincode = $10,
      marks = $11,
      subject = $12,
      roll_no = $13,
      admission_date = $14
    WHERE id = $15
    RETURNING *;
  `;

    const values = [
        first_name, last_name, email, phone, dob, gender,
        address, city, state, pincode, marks, subject, roll_no, admission_date, id
    ];

    const result = await pool.query(query, values);

    return { success: true, data: result.rows[0] };
};

module.exports = { createStudent, updateStudent };
