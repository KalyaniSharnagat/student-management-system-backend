const Joi = require("joi");

//?----------Create student validation--------------
exports.createStudentValidationSchema = Joi.object({
    first_name: Joi.string().trim().min(2).max(50).required().messages({ "string.empty": "First name is required", "string.min": "First name must be at least 2 characters", "string.max": "First name must be less than 50 characters", }),
    last_name: Joi.string().trim().min(2).max(50).required().messages({ "string.empty": "Last name is required", "string.min": "Last name must be at least 2 characters", "string.max": "Last name must be less than 50 characters", }),
    email: Joi.string().trim().email({ tlds: { allow: false } }).required().messages({ "string.empty": "Email is required", "string.email": "Invalid email address", }),
    mobile: Joi.string().pattern(/^[0-9]{10}$/).required().messages({ "string.empty": "Mobile number is required", "string.pattern.base": "Invalid mobile number format", }),
    password: Joi.string().min(8).max(16).required().messages({ "string.empty": "Password is required", "string.min": "Password must be at least 8 characters", "string.max": "Password must be at most 16 characters", }),
    gender: Joi.string().valid('male', 'female', 'other').required().messages({ "any.only": "Gender must be one of 'male', 'female', or 'other'", "string.empty": "Gender is required" }),
    rollno: Joi.string().optional().allow(null, ""),
    subject: Joi.string().optional().allow(null, ""),
    marks: Joi.number().optional().allow(null).messages({ "number.base": "Marks must be a number", }),
    address: Joi.string().optional().allow(null, ""),
    city: Joi.string().optional().allow(null, ""),
    state: Joi.string().optional().allow(null, ""),
    pincode: Joi.string().optional().allow(null, ""),
    dob: Joi.date().optional().allow(null).messages({ "date.base": "DOB must be a valid date", }),
});

//?-----------------update student validation-------------
exports.updateStudentValidationSchema = Joi.object({
    id: Joi.number().required(),
    first_name: Joi.string().trim().min(2).max(50).required().messages({ "string.empty": "First name is required", "string.min": "First name must be at least 2 characters", "string.max": "First name must be less than 50 characters", }),
    last_name: Joi.string().trim().min(2).max(50).required().messages({ "string.empty": "Last name is required", "string.min": "Last name must be at least 2 characters", "string.max": "Last name must be less than 50 characters", }),
    email: Joi.string().trim().email({ tlds: { allow: false } }).required().messages({ "string.empty": "Email is required", "string.email": "Invalid email address", }),
    mobile: Joi.string().pattern(/^[0-9]{10}$/).required().messages({ "string.empty": "Mobile number is required", "string.pattern.base": "Invalid mobile number format", }),
    password: Joi.string().min(8).max(16).required().messages({ "string.empty": "Password is required", "string.min": "Password must be at least 8 characters", "string.max": "Password must be at most 16 characters", }),
    gender: Joi.string().valid('male', 'female', 'other').required().messages({ "any.only": "Gender must be one of 'male', 'female', or 'other'", "string.empty": "Gender is required" }),
    rollno: Joi.string().optional().allow(null, ""),
    subject: Joi.string().optional().allow(null, ""),
    marks: Joi.number().optional().allow(null).messages({ "number.base": "Marks must be a number", }),
    address: Joi.string().optional().allow(null, ""),
    city: Joi.string().optional().allow(null, ""),
    state: Joi.string().optional().allow(null, ""),
    pincode: Joi.string().optional().allow(null, ""),
    dob: Joi.date().optional().allow(null).messages({ "date.base": "DOB must be a valid date", }),

})
