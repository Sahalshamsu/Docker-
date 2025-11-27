const express = require("express");
const router = express.Router();
const { addStudent, getStudents } = require("../Controller/Studcontr");

router.post("/addstudent", addStudent);
router.get("/getstudents", getStudents);

module.exports = router;