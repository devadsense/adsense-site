const fallbackPosts = [
  {
    title: "Sample Post 1",
    content: "This is sample content for post 1...",
    time: "2025-04-18 10:00 AM",
    address: "photo/bolero.html",
    image: "post/images/sample1.jpg"
  },
  {
    title: "Sample Post 2",
    content: "This is sample content for post 2...",
    time: "2025-04-18 09:30 AM",
    address: "post/post2.html",
    image: "post/images/sample2.jpg"
  },
  {
    title: "Sample Post 3",
    content: "This is sample content for post 3...",
    time: "2025-04-17 08:15 PM",
    address: "post/post3.html",
    image: "post/images/sample3.jpg"
  }
];

function showRelatedNews(posts) {
  const container = document.getElementById("relatedPosts");
  container.innerHTML = "";

  if (!posts || posts.length === 0) {
    container.innerHTML = "<p>No related news found.</p>";
    return;
  }

  const related = posts.slice(0, 3);
  related.forEach(p => {
    const div = document.createElement("div");
    div.className = "news-post";
    div.innerHTML = `
      <img src="${p.image}" alt="${p.title}" />
      <div class="content">
        <h3><a href="${p.address}">${p.title}</a></h3>
        <p>${p.content.slice(0, 100)}...</p>
        <p class="timestamp">${p.time}</p>
      </div>
    `;
    container.appendChild(div);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const posts = JSON.parse(localStorage.getItem("newsPosts")) || fallbackPosts;
  showRelatedNews(posts);
});
