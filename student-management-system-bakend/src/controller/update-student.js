// src/controller/update-student.js
const studentService = require('../services/student.service');

const updateStudent = async (req, res, next) => {
    try {
        const { id } = req.params; // Student ID from URL
        const studentData = req.body;

        console.log("Updating student with ID:", id);
        console.log("New student data:", studentData);

        const result = await studentService.updateStudent(id, studentData);

        if (!result.success) {
            return res.status(400).json(result); // e.g., student not found or duplicate email
        }

        res.status(200).json({
            success: true,
            message: "Student updated successfully",
            data: result.data,
        });
    } catch (error) {
        console.error("Error in updateStudent:", error.message);
        next(error); // Passes to global error handler
    }
};

module.exports = { updateStudent };
