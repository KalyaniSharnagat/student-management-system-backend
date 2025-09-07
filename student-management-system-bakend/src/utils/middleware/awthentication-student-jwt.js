const jwt = require('jsonwebtoken');
const studentService = require('../../services/student.service');


const authenticateStudentJWT = async (request, response, next) => {
    try {
        const authHeader = request.header('authorization');
        if (authHeader) {
            const token = authHeader.split(' ')[1];

            jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, studentObject) => {
                if (err) {
                    response.status(200).json({
                        status: "JWT_INVALID",
                        message: "Your session has ended. Please login again."
                    });
                    return;
                } else {
                    request.studentId = studentObject.studentId;

                    // check if student exists
                    const doesStudentExist = await studentService.getStudentUserById(studentObject?.studentId)
                    if (!doesStudentExist) {
                        response.status(200).json({
                            status: "JWT_INVALID",
                            message: "Your session has ended. Please login again."
                        });
                        return;
                    }
                    request.mobile = doesStudentExist.mobile;
                    request.id = doesStudentExist.id;

                }
                next();
            });
        } else {
            response.status(200).json({
                status: "JWT_INVALID",
                message: "Your session has ended. Please login again."
            });
            return;
        }
    } catch (error) {
        response.status(500).json({
            status: "FAILED",
            message: error.message
        });
        return;
    }
};


module.exports = authenticateStudentJWT;