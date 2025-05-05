window.onload = renderStudentList;

function registerStudent() {
  const name = document.getElementById("name").value;
  const id = document.getElementById("id").value;
  const email = document.getElementById("email").value;
  const contact = document.getElementById("contact").value;
  const address = document.getElementById("address").value;

  if (name && id && email && contact && address && contact.length === 10) {
    const student = { name, id, email, contact, address };
    const students = JSON.parse(localStorage.getItem("students")) || [];
    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));
    renderStudentList();
    alert("Student registered successfully!");

    document.getElementById("name").value = "";
    document.getElementById("id").value = "";
    document.getElementById("email").value = "";
    document.getElementById("contact").value = "";
    document.getElementById("address").value = "";
  } else {
    alert("Please fill in all fields and enter contact number accurately.");
  }
}

function renderStudentList() {
  const studentList = document.getElementById("studentList");
  studentList.innerHTML = "";
  const students = JSON.parse(localStorage.getItem("students")) || [];

  students.forEach((student, index) => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${student.name}</td>
        <td>${student.id}</td>
        <td>${student.email}</td>
        <td>${student.contact}</td>
        <td>${student.address}</td>
        <td><button onclick="editStudent(this, ${index})"><i class="fa-solid fa-pen"></i></button></td>
        <td><button onclick="deleteStudent(${index})"><i class="fa-solid fa-trash"></i></button></td>
      `;
    studentList.appendChild(newRow);
  });
}

function deleteStudent(index) {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));
  renderStudentList();
}

function editStudent(button, index) {
  const row = button.parentElement.parentElement;
  const cells = row.querySelectorAll("td");

  if (button.innerHTML.includes("fa-pen")) {
    for (let i = 0; i < 5; i++) {
      const currentText = cells[i].innerText;
      cells[i].innerHTML = `<input type="text" value="${currentText}">`;
    }
    button.innerHTML = `<i class="fa-solid fa-check"></i>`;
  } else {
    const updatedStudent = {
      name: cells[0].querySelector("input").value,
      id: cells[1].querySelector("input").value,
      email: cells[2].querySelector("input").value,
      contact: cells[3].querySelector("input").value,
      address: cells[4].querySelector("input").value,
    };

    const students = JSON.parse(localStorage.getItem("students")) || [];
    students[index] = updatedStudent;
    localStorage.setItem("students", JSON.stringify(students));
    renderStudentList();
  }
}
