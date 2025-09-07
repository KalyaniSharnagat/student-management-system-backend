const studentService = require("../services/student.service");

const getStudents = async (req, res, next) => {
    try {
        const students = await studentService.getAllStudents();
        res.status(200).json({ success: true, data: students });
    } catch (error) {
        next(error);
    }
};

module.exports = { getStudents };
