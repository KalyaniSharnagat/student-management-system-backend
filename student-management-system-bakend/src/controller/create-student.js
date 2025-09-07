const studentService = require("../services/student.service");

const createStudent = async (req, res, next) => {
  try {
    const studentData = req.body;
    const result = await studentService.createStudent(studentData);

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createStudent };
