// src/controller/create-student.js
const studentService = require('../services/student.service');

const createStudent = async (req, res, next) => {
  try {
    const studentData = req.body;
    console.log("Incoming student data:", studentData); // Debug log

    const result = await studentService.createStudent(studentData);

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: result
    });
  } catch (error) {
    console.error("Error in createStudent:", error.message);
    next(error); // Sends error to global handler
  }
};

module.exports = { createStudent };
