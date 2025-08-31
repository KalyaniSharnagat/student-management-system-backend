const { createStudentService } = require("../services/student.service");

// Controller: Create Student
exports.createStudent = async (req, res) => {
  try {
    const studentData = req.body;

    // Call Service
    const newStudent = await createStudentService(studentData);

    res.status(201).json({
      message: "Student created successfully",
      data: newStudent
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
