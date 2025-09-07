const studentService = require("../services/student.service");

const deleteStudent = async (req, res, next) => {
    try {
        const id = req.params.id; // ID comes from URL
        const result = await studentService.deleteStudent(id);

        res.status(200).json({
            success: true,
            message: "Student deleted",
            data: result
        });
    } catch (error) {
        next(error); // sends "Student not found" if ID doesn't exist
    }
};

module.exports = { deleteStudent };
