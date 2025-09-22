const studentService = require("../services/student.service");

const deleteStudent = async (req, res) => {
    try {
        // 📌 Get student ID from route params
        const id = req.body.id;
        if (!id) {
            return res.status(400).json({
                status: "FAILED",
                message: "Student ID is required",
            });
        }

        // 📌 Check if student exists
        const student = await studentService.getStudentById(id);
        if (!student) {
            return res.status(404).json({
                status: "FAILED",
                message: "Student not found with this ID",
            });
        }

        // 📌 Delete student
        await studentService.deleteStudent(id);

        return res.status(200).json({
            status: "SUCCESS",
            message: "Student deleted successfully",
        });

    } catch (error) {
        return res.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = deleteStudent;
