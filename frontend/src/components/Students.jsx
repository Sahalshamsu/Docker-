import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Students() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [rollno, setRollno] = useState("");
  const [course, setCourse] = useState("");
  const [students, setStudents] = useState([]);

  const APP_URL = "http://localhost:5000/api/addstudent";
  const FETCH_URL = "http://localhost:5000/api/getstudents";

  useEffect(() => {
    fetchDetails();
  }, []);

  const Adddetails = async (e) => {
    e.preventDefault();
    try {
      await axios.post(APP_URL, {
        name,
        age,
        course,
        rollno,
      });

      alert("Student details added successfully!");

      setName("");
      setAge("");
      setCourse("");
      setRollno("");

      fetchDetails();
    } catch (error) {
      console.log("Error:", error);
      alert("Failed to add student details");
    }
  };

  const fetchDetails = async () => {
    try {
      const response = await axios.get(FETCH_URL);
      setStudents(response.data.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Student Details</h2>

      <div className="card shadow p-4 mb-5">
        <h4 className="mb-3">Add Student</h4>

        <form onSubmit={Adddetails}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your Roll No."
              value={rollno}
              onChange={(e) => setRollno(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>
      </div>

      <div className="card shadow p-4">
        <h4>All Students</h4>

        <table className="table table-bordered table-striped mt-3">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Course</th>
              <th>Roll Number</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.course}</td>
                <td>{student.rollno}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Students;
