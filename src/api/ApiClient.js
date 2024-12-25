export const addStudentDetail = async (name, address) => {
  const student = { name, address };

  await fetch("http://localhost:8080/student/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  });
};

export const getStudentDetail = (setStudents) => {
  fetch("http://localhost:8080/student/getAll", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    // body: JSON.stringify(student),
  })
    .then((resp) => resp.json())
    .then((result) => {
      setStudents(result);
      console.log(result);
    });
};

export const deleteStudentData = async (id) => {
  await fetch(`http://localhost:8080/student/delete/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    // body: JSON.stringify(student),
  });
};

export const updateStudentData = async (id, name, address) => {
  const student = { name, address };
  await fetch(`http://localhost:8080/student/update/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  });
};
