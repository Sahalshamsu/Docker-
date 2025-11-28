import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css";

function Project() {

  const [studentId, setStudentId] = useState('')
  const [projectname, setProjectName] = useState('')
  const [dos, setDos] = useState('')
  const [msg, setMsg] = useState('')
  const [projlist, setProjlist] = useState([])

  const addProject = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:5000/api/pro/addpro", {
        studentId,
        projectname,
        dos,
      })

      setMsg("Project added successfully")
      setStudentId('')
      setProjectName("")
      setDos("")

      fetchAllProjects()
    } catch (err) {
      setMsg("Error adding Project")
    }
  }

  const getByStudent = async () => {
    if (!studentId) return alert("Enter student id first")

    try {
      const res = await axios.get(
        `http://localhost:5000/api/pro/getp/${studentId}`
      )
      setProjlist(res.data)
      setMsg('Fetched student projects')
    } catch (err) {
      setMsg("Error fetching student project")
    }
  }

  const fetchAllProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/pro/getall")
      setProjlist(res.data)
      setMsg("Fetched all Projects")
    } catch (err) {
      setMsg("Error fetching projects")
    }
  }

  useEffect(() => {
    fetchAllProjects()
  }, [])

  return (
    <div className="container mt-4">

      
      {msg && (
        <div className="alert alert-info text-center">{msg}</div>
      )}

      
      <div className="card p-4 mb-4 shadow-sm">
        <h3 className="mb-3">Add Project</h3>

        <form onSubmit={addProject}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Student ID"
              className="form-control"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Project Name"
              className="form-control"
              value={projectname}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="date"
              className="form-control"
              value={dos}
              onChange={(e) => setDos(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>
      </div>

   
      <div className="card p-4 mb-4 shadow-sm">
        <h3 className="mb-3">Search All Projects</h3>

        <div className="d-flex gap-3">
          <input
            type="text"
            placeholder="Enter Student ID"
            className="form-control"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />

          <button className="btn btn-success" onClick={getByStudent}>
            Search
          </button>
        </div>
      </div>

     
      <div className="card p-4 shadow-sm">
        <h3>Project List</h3>

        <table className="table table-bordered table-striped mt-3">
          <thead className="table-dark">
            <tr>
              <th>Project Name</th>
              <th>Date</th>
              <th>Student Name</th>
              <th>Course</th>
              <th>Roll No</th>
            </tr>
          </thead>

          <tbody>
            {projlist.map((pro) => (
              <tr key={pro._id}>
                <td>{pro.projectname}</td>
                <td>{pro.dos}</td>
                <td>{pro.studentdetails?.name}</td>
                <td>{pro.studentdetails?.course}</td>
                <td>{pro.studentdetails?.rollno}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Project
