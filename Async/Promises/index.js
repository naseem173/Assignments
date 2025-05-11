
// Task 2: Fetch and display user data using promise
function startPromise() {
  const output = document.getElementById("output2");
  output.innerHTML = "Loading...";

  // Create timeout promise
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Operation timed out.")), 5000)
  );

  // Create fetch promise
  const fetchUsers = fetch("https://dummyjson.com/users").then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });

  // Use Promise.race to race fetch vs timeout
  Promise.race([fetchUsers, timeout])
    .then((data) => {
      const users = data.users.slice(0, 5); // Limit to 5 users
      let html = "<strong>Promise executed. Here are some users:</strong><ul>";
      users.forEach((user) => {
        html += `<li>${user.firstName} ${user.lastName}</li>`;
      });
      html += "</ul>";
      output.innerHTML = html;
    })
    .catch((error) => {
      output.textContent = `Error: ${error.message}`;
      console.error(error);
    });
}

