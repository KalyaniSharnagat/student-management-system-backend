const express = require("express");
const { createStudent } = require("../controller/create-student");
const { updateStudent } = require("../controller/update-student");
const { deleteStudent } = require("../controller/delete-students");
const { getStudents } = require("../controller/get-student");

// const { updateStudent } = require("../controllers/update-student");

const router = express.Router();

router.post("/create-student", createStudent);
router.post("/update-student", updateStudent);
router.post("/delete-student", deleteStudent);
router.post("/get-students", getStudents);

module.exports = router;
