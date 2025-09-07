// src/routes/student.routes.js
import express from "express";
import { createStudent } from "../controller/create-student.js";
import { updateStudent } from "../controller/update-student.js";

const router = express.Router();

router.post("/create-student", createStudent);  // ✅ POST route
router.put("/update-student/:id", updateStudent);  // ✅ PUT route for updating student
export default router;
