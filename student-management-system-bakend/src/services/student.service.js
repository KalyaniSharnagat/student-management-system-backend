const { Student } = require("../models/student.model");

// Service: Create Student
const createStudentService = async (studentData) => {
  try {
    const student = await Student.create(studentData);
    return student;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { createStudentService };
