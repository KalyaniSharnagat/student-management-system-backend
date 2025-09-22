const bcrypt = require("bcrypt");
const { createStudentValidationSchema } = require("../utils/validation/student.validation");
const studentService = require("../services/student.service");

const createStudent = async (request, response) => {
    try {
        // Extract data from request body
        const { first_name, last_name, email, mobile, password, gender, rollno, subject, marks, address } = request.body;

        // Check validation
        const validationResult = await createStudentValidationSchema.validate(
            { first_name: first_name, last_name: last_name, email, mobile, password, gender, rollno, subject, marks, address },
            { abortEarly: true }
        );


        if (validationResult.error) {
            return response.status(200).json({
                status: "FAILED",
                message: validationResult.error.details[0].message,
            });
        }

        // Check if Student already exists with email
        const isStudentExist = await studentService.getStudentByEmail(email);
        if (isStudentExist) {
            return response.status(200).json({
                status: "FAILED",
                message: " Student already exists with this Email, please try another Email",
            });
        }

        // Hash password
        const hashPassword = await bcrypt.hash(password, 12);

        const dataToInsert = {
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
            // dob: dob?.toString(), // Uncomment if date is available
            isActive: true,
        };

        // Insert data into DB & send response
        const result = await studentService.createStudent(dataToInsert);

        if (result) {
            return response.status(200).json({
                status: "SUCCESS",
                message: "Student created successfully",
            });
        } else {
            return response.status(200).json({
                status: "FAILED",
                message: "Failed to create Student, please try again!",
            });
        }
    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = createStudent;
