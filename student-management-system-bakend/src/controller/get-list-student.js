const studentService = require("../services/student.service");

const getStudentList = async (req, res) => {
    try {
        // Optional query parameters for pagination & search
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const searchString = req.query.search || "";

        const { count, rows } = await studentService.getStudentList({ page, limit, searchString });

        // Remove passwords from all results
        const students = rows.map(student => {
            const s = student.toJSON();
            delete s.password;
            return s;
        });

        return res.status(200).json({
            status: "SUCCESS",
            data: {
                students,
                total: count,
                page,
                limit
            }
        });
    } catch (error) {
        return res.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = getStudentList;
