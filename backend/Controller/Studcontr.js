const Student = require("../Model/Student");

const addStudent = async (req, res) => {
  try {
    const { name, age, rollno, course } = req.body;

    const newStudent = new Student({
      name,
      age,
      rollno,
      course,
    });

    await newStudent.save();

    res.status(200).json({
      success: true,
      message: "Student details added successfully",
      data: newStudent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add student details",
      error: error.message,
    });
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await Student.find();

    res.status(200).json({
      success: true,
      message: "Students fetched successfully",
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch student details",
      error: error.message,
    });
  }
};

module.exports = { addStudent, getStudents };