const express = require("express");
const createStudent = require("../controller/create-student");
const updateStudent = require("../controller/update-student");
const getStudent = require("../controller/get-student");
const deleteStudent = require("../controller/delete-students");
const getStudentList = require("../controller/get-list-student");



// const { updateStudent } = require("../controllers/update-student");

const studentRoutes = express.Router();

studentRoutes.post("/create-student", createStudent);
studentRoutes.post("/get-student", getStudent);
studentRoutes.post("/update-student", updateStudent);
studentRoutes.post("/delete-student", deleteStudent);
studentRoutes.post("/get-list-student", getStudentList);
module.exports = studentRoutes;
