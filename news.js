// js/news.js

document.addEventListener("DOMContentLoaded", () => {
  // 1) Default posts for first-time load
  const defaultPosts = [
    {
      title: "Breaking News: Global Climate Summit",
      content: "World leaders gather to discuss urgent climate issues...",
      time: "2025-04-18 10:00 AM",
      address: "post/post1",
      image: "post/images/climate.jpg"
    },
    {
      title: "Technology Advances: AI in Healthcare",
      content: "Artificial intelligence is revolutionizing the healthcare industry...",
      time: "2025-04-18 09:30 AM",
      address: "post/post2.html",
      image: "post/images/ai-health.jpg"
    },
    {
      title: "Sports: Football World Cup Finals",
      content: "The Football World Cup is reaching its final stages...",
      time: "2025-04-17 08:15 PM",
      address: "post/post3.html",
      image: "post/images/football.jpg"
    }
  ];

  // 2) Save to localStorage if empty
  if (!localStorage.getItem("newsPosts")) {
    localStorage.setItem("newsPosts", JSON.stringify(defaultPosts));
  }

  // 3) Fetch posts and setup pagination
  const posts = JSON.parse(localStorage.getItem("newsPosts"));
  let currentPage = 1;
  const postsPerPage = 5;

  // अब DOM सेलेक्टर करेँ
  const latestEl    = document.getElementById("latestPost");
  const containerEl = document.getElementById("newsContainer");
  const prevBtn     = document.getElementById("prevBtn");
  const nextBtn     = document.getElementById("nextBtn");

  function displayLatestPost() {
    if (posts.length) {
      const p = posts[0];
      latestEl.innerHTML = `
        <div class="news-post">
          <img src="${p.image}" alt="${p.title}" />
          <div class="content">
            <h3><a href="${p.address}">${p.title}</a></h3>
            <p>${p.content.slice(0, 100)}...</p>
            <p class="timestamp">${p.time}</p>
          </div>
        </div>
      `;
    } else {
      latestEl.innerHTML = "<p>No latest news available.</p>";
    }
  }

  function displayPosts() {
    containerEl.innerHTML = "";
    const start = (currentPage - 1) * postsPerPage;
    const pagePosts = posts.slice(start, start + postsPerPage);

    if (!pagePosts.length) {
      containerEl.innerHTML = "<p>No news available.</p>";
      return;
    }

    pagePosts.forEach(p => {
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
      containerEl.appendChild(div);
    });

    // disable buttons appropriately
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage * postsPerPage >= posts.length;
  }

  // बटन इवेंट्स भी DOM-ready होने पर
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayPosts();
    }
  });
  nextBtn.addEventListener("click", () => {
    if (currentPage * postsPerPage < posts.length) {
      currentPage++;
      displayPosts();
    }
  });

  // 마지막으로 इनीशियलाईज़
  displayLatestPost();
  displayPosts();
});
