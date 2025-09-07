const studentService = require("../services/student.service");

const updateStudent = async (req, res, next) => {
    try {
        const id = req.body.id;
        const studentData = req.body;
        const result = await studentService.updateStudent(id, studentData);

        res.status(200).json({
            success: true,
            message: "Student updated successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { updateStudent };
