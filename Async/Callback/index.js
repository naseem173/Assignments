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
