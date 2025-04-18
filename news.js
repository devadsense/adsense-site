// news.js
document.addEventListener("DOMContentLoaded", () => {
  // 1) डिफ़ॉल्ट पोस्ट्स (पहली बार के लिए)
  const defaultPosts = [
    {
      title:   "Breaking News: Global Climate Summit",
      content: "World leaders gather to discuss urgent climate issues. The summit aims to create new strategies to reduce global warming.",
      time:    "2025-04-18 10:00 AM",
      address: "post/post1.html"
    },
    {
      title:   "Technology Advances: AI in Healthcare",
      content: "Artificial intelligence is revolutionizing the healthcare industry, making diagnosis more accurate and accessible.",
      time:    "2025-04-18 09:30 AM",
      address: "post/post2.html"
    },
    {
      title:   "Sports: Football World Cup Finals",
      content: "The Football World Cup is reaching its final stages with the two most formidable teams about to clash for the trophy.",
      time:    "2025-04-17 08:15 PM",
      address: "post/post3.html"
    }
  ];

  // 2) अगर पहले से localStorage में नहीं हैं तो सेव कर दो
  if (!localStorage.getItem("newsPosts")) {
    localStorage.setItem("newsPosts", JSON.stringify(defaultPosts));
  }

  // 3) अब posts लो और पेज सेटअप करो
  const posts = JSON.parse(localStorage.getItem("newsPosts"));
  let currentPage = 1;
  const postsPerPage = 5;

  const latestEl    = document.getElementById("latestPost");
  const containerEl = document.getElementById("newsContainer");
  const prevBtn     = document.getElementById("prevBtn");
  const nextBtn     = document.getElementById("nextBtn");

  function displayLatestPost() {
    if (posts.length > 0) {
      const p = posts[0];
      latestEl.innerHTML = `
        <div class="news-post">
          <h3><a href="${p.address}">${p.title}</a></h3>
          <p>${p.content.slice(0,100)}…</p>
          <p class="timestamp">${p.time}</p>
        </div>
      `;
    } else {
      latestEl.innerHTML = "<p>कोई ताज़ा खबर उपलब्ध नहीं है।</p>";
    }
  }

  function displayPosts() {
    containerEl.innerHTML = "";
    const start = (currentPage - 1)*postsPerPage;
    const pagePosts = posts.slice(start, start + postsPerPage);

    if (pagePosts.length === 0) {
      containerEl.innerHTML = "<p>कोई समाचार नहीं मिला।</p>";
      return;
    }

    pagePosts.forEach(p => {
      const div = document.createElement("div");
      div.className = "news-post";
      div.innerHTML = `
        <h3><a href="${p.address}">${p.title}</a></h3>
        <p>${p.content.slice(0,100)}…</p>
        <p class="timestamp">${p.time}</p>
      `;
      containerEl.appendChild(div);
    });
  }

  prevBtn.addEventListener("click", () => {
    if (currentPage>1) {
      currentPage--;
      displayPosts();
    }
  });
  nextBtn.addEventListener("click", () => {
    if (currentPage*postsPerPage < posts.length) {
      currentPage++;
      displayPosts();
    }
  });

  // Initialize
  displayLatestPost();
  displayPosts();
});
