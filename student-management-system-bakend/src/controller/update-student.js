const bcrypt = require("bcrypt");
const { createStudentValidationSchema } = require("../utils/validation/student.validation");
const studentService = require("../services/student.service");

const updateStudent = async (req, res) => {
    try {
        const id = req.body.id;
        if (!id) {
            return res.status(400).json({
                status: "FAILED",
                message: "Student ID is required",
            });
        }

        // Extract data from request body
        const { first_name, last_name, email, mobile, password, gender, rollno, subject, marks, address } = req.body;

        // Validate incoming data
        const validationResult = await createStudentValidationSchema.validate(
            { first_name, last_name, email, mobile, password, gender, rollno, subject, marks, address },
            { abortEarly: true }
        );

        if (validationResult.error) {
            return res.status(200).json({
                status: "FAILED",
                message: validationResult.error.details[0].message,
            });
        }

        // Check if email is being updated to another student's email
        const existingStudent = await studentService.getStudentByEmail(email);
        if (existingStudent && existingStudent.id != id) {
            return res.status(200).json({
                status: "FAILED",
                message: "Another student already exists with this email",
            });
        }

        // Hash password if provided
        let hashPassword = undefined;
        if (password) {
            hashPassword = await bcrypt.hash(password, 12);
        }

        const dataToUpdate = {
            first_name: first_name?.toLowerCase(),
            last_name: last_name?.toLowerCase(),
            email,
            mobile: mobile?.toString(),
            password: hashPassword,
            gender: gender || null,
            rollno: rollno?.toString(),
            subject: subject?.toLowerCase(),
            marks: marks,
            address: address?.toLowerCase(),
        };

        // Update student in DB
        const updatedStudent = await studentService.updateStudent(id, dataToUpdate);

        if (!updatedStudent) {
            return res.status(404).json({
                status: "FAILED",
                message: "Student not found with this ID",
            });
        }

        // Remove password before sending response
        const studentData = updatedStudent.toJSON();
        delete studentData.password;

        return res.status(200).json({
            status: "SUCCESS",
            message: "Student updated successfully",
            data: studentData,
        });

    } catch (error) {
        return res.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = updateStudent;
