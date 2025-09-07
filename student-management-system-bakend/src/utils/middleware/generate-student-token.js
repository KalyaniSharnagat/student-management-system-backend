const jwt = require("jsonstudenttoken");

const secretKey = process.env.JWT_SECRET_KEY;



module.exports = function generateStudentJWT(studentId, name, email, rollNumber, subject, marks) {
    return jwt.sign({ studentId, name, email, rollNumber, subject, marks}, secretKey, { expiresIn: process.env.JWT_EXPIRE_TIME });
}



