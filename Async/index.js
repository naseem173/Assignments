function delayCallback(callback) {
  setTimeout(callback, 5000); // simulate a 5-second delay
}

// Task 1: Fetch and display post titles
function fetchAndDisplayPosts() {
  fetch("https://dummyjson.com/posts")
    .then((response) => response.json())
    .then((data) => {
      const posts = data.posts.slice(0, 9); // Limit to 5 posts
      let html =
        "<strong>Callback executed after 5 seconds. Here are some posts:</strong><ul>";
      posts.forEach((post) => {
        html += `<li>${post.title}</li>`;
      });
      html += "</ul>";
      document.getElementById("output").innerHTML = html;
    })
    .catch((error) => {
      document.getElementById("output").textContent = "Error fetching posts.";
      console.error(error);
    });
}

function startCallback() {
  document.getElementById("output").textContent = "Waiting for 5 seconds...";
  delayCallback(fetchAndDisplayPosts);
}

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


// Task 3: Fetch and display user data using async/await

async function getPosts() {
  const output = document.getElementById("output3");
  output.innerHTML = "Loading...";

  // Timeout promise (5 seconds)
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Operation timed out.")), 5000);
  });

  // Fetch posts
  const fetchPromise = fetch("https://dummyjson.com/posts").then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });

  try {
    const result = await Promise.race([fetchPromise, timeoutPromise]);
    const posts = result.posts.slice(0, 8); // Get first 8 posts
    let html = `<i class="fa-regular fa-hand-point-down"></i><ul>`;
    posts.forEach((post) => {
      html += `<li>${post.title}</li>`;
    });
    html += "</ul>";
    output.innerHTML = html;
  } catch (error) {
    output.innerHTML = `Error: ${error.message}`;
    console.error(error);
  }
}

