import React, { useEffect, useState } from "react";
import {
  addStudentDetail,
  deleteStudentData,
  getStudentDetail,
  updateStudentData,
} from "../api/ApiClient";
// import { Button } from "bootstrap";

const Form = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    getStudentDetail(setStudents); // Fetch all students when the component mounts
  }, []);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingStudent) {
      await updateStudentData(editingStudent.id, name, address); // Update student
      setEditingStudent(null); // Reset editing state
    } else {
      // Otherwise, add a new student
      await addStudentDetail(name, address); // Add new student
    }
    setName("");
    setAddress("");
    getStudentDetail(setStudents);
    // console.log(a);
  };

  const handleDelete = async (id) => {
    await deleteStudentData(id);
    getStudentDetail(setStudents);
  };
  const handleUpdate = (student) => {
    setEditingStudent(student); // Set the student to be edited
    setName(student.name); // Pre-fill the form with the student's data
    setAddress(student.address);
  };
  return (
    <div>
      <form style={{ width: "50%", margin: "auto" }}>
        <div class="mb-3">
          <label class="form-label">Name</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name={name}
            value={name}
            onChange={handleName}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Address</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputPassword1"
            name={address}
            value={address}
            onChange={handleAddressChange}
          />
        </div>

        <button type="submit" class="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </form>
      <table class="table .table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        {students?.map((student) => (
          <tbody key={student.id}>
            <tr>
              <td>{student.name}</td>
              <td>{student.address}</td>
              <td class="d-flex gap-2  justify-content-center">
                <button
                  class="btn btn-warning ml-2"
                  onClick={() => handleDelete(student.id)}
                >
                  Delete
                </button>
                <button
                  class="btn btn-warning mr-3 ml-3"
                  onClick={() => handleUpdate(student)}
                >
                  Edit
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default Form;
