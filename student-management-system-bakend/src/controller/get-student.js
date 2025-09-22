const studentService = require("../services/student.service");

const getStudent = async (req, res) => {
    try {
        // 📌 Get the id from route params (preferred) or body
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                status: "FAILED",
                message: "Student ID is required",
            });
        }

        // 📌 Fetch student by ID
        const student = await studentService.getStudentById(id);

        if (!student) {
            return res.status(404).json({
                status: "FAILED",
                message: "Student not found with this ID",
            });
        }

        // 🚫 Never send password back
        const studentData = student.toJSON();
        delete studentData.password;

        return res.status(200).json({
            status: "SUCCESS",
            message: "Student fetched successfully",
            data: studentData,
        });
    } catch (error) {
        return res.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = getStudent;
