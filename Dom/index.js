// Call renderStudentList when the page loads to show existing student data
window.onload = renderStudentList;

// Function to register a new student and store in localStorage
function registerStudent() {
  // Get form input values
  const name = document.getElementById("name").value;
  const id = document.getElementById("id").value;
  const email = document.getElementById("email").value;
  const contact = document.getElementById("contact").value;
  const address = document.getElementById("address").value;

  // Validate input: all fields must be filled and contact must be 10 digits
  if (name && id && email && contact && address && contact.length === 10) {
    // Create a student object
    const student = { name, id, email, contact, address };

    // Retrieve current student list or start with an empty array
    const students = JSON.parse(localStorage.getItem("students")) || [];

    // Add new student to list
    students.push(student);

    // Save updated list to localStorage
    localStorage.setItem("students", JSON.stringify(students));

    // Refresh the table with the new data
    renderStudentList();

    // Show success message
    alert("Student registered successfully!");

    // Clear form inputs
    document.getElementById("name").value = "";
    document.getElementById("id").value = "";
    document.getElementById("email").value = "";
    document.getElementById("contact").value = "";
    document.getElementById("address").value = "";
  } else {
    alert("Please fill in all fields and enter contact number accurately.");
  }
}

// Function to display the list of students in the table
function renderStudentList() {
  const studentList = document.getElementById("studentList");
  studentList.innerHTML = ""; // Clear existing rows

  // Get students from localStorage
  const students = JSON.parse(localStorage.getItem("students")) || [];

  // Loop through each student and create table rows
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
    studentList.appendChild(newRow); // Add the row to the table body
  });
}

// Function to delete a student based on index
function deleteStudent(index) {
  const students = JSON.parse(localStorage.getItem("students")) || [];

  // Remove student from array
  students.splice(index, 1);

  // Update localStorage
  localStorage.setItem("students", JSON.stringify(students));

  // Refresh the list
  renderStudentList();
}

// Function to edit a student's data
function editStudent(button, index) {
  const row = button.parentElement.parentElement; // Get the current table row
  const cells = row.querySelectorAll("td"); // Get all cells in the row

  // If the button is in "edit" mode (pen icon)
  if (button.innerHTML.includes("fa-pen")) {
    // Convert the first 5 cells into input fields
    for (let i = 0; i < 5; i++) {
      const currentText = cells[i].innerText;
      cells[i].innerHTML = `<input type="text" value="${currentText}">`;
    }

    // Change icon to "check" for saving
    button.innerHTML = `<i class="fa-solid fa-check"></i>`;
  } else {
    // Gather updated values from input fields
    const updatedStudent = {
      name: cells[0].querySelector("input").value,
      id: cells[1].querySelector("input").value,
      email: cells[2].querySelector("input").value,
      contact: cells[3].querySelector("input").value,
      address: cells[4].querySelector("input").value,
    };

    // Update the student list in localStorage
    const students = JSON.parse(localStorage.getItem("students")) || [];
    students[index] = updatedStudent;
    localStorage.setItem("students", JSON.stringify(students));

    // Re-render the list
    renderStudentList();
  }
}
