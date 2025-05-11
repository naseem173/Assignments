

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

